import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { NotFoundError, UnauthorizedError } from "../../constants/errors.js";
import {
  printerJobRepository,
  printerRepository,
} from "../../database/printer.js";
import { userFileRepository } from "../../database/user-file.js";
import { PrinterDisabledError } from "./errors.js";
import {
  printerJobCreateSchema,
  printerJobGetSchema,
  printerJobListSchema,
} from "./schema.js";

export const printerJobRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: printerJobListSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const printerJobs =
      request.user.role === "user"
        ? await printerJobRepository.getPrinterJobsByUserId(request.user.id)
        : await printerJobRepository.getPrinterJobs();

    return {
      printer_jobs: printerJobs,
    };
  });

  fastify.get("/:id", { schema: printerJobGetSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const printerJob = await printerJobRepository.getPrinterJobById(
      request.params.id,
    );

    if (!printerJob) {
      throw new NotFoundError();
    }

    return {
      printer_job: printerJob,
    };
  });

  fastify.post("/", { schema: printerJobCreateSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const userFile = await userFileRepository.getUserFileById(
      request.body.file_id,
    );
    if (!userFile) {
      throw new NotFoundError();
    }

    if (userFile.user_id !== request.user.id) {
      throw new UnauthorizedError();
    }

    const printer = await printerRepository.getPrinterById(
      request.body.printer_id,
    );
    if (!printer) {
      throw new NotFoundError();
    }

    if (!printer.is_enabled) {
      throw new PrinterDisabledError();
    }

    const printerJob = await printerJobRepository.createPrinterJob({
      ...request.body,
      user_id: request.user.id,
      start_time: new Date(),
      end_time: null,
    });

    return {
      printer_job: printerJob,
    };
  });
};
