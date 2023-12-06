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
      request.user.role === "student"
        ? await printerJobRepository.getPrinterJobsByUserId(request.user.id)
        : await printerJobRepository.getPrinterJobs();

    const [userFiles, printers] = await Promise.all([
      userFileRepository.getUserFileByIds(
        printerJobs.map((printerJob) => printerJob.file_id),
      ),
      printerRepository.getPrintersByIds(
        printerJobs.map((printerJob) => printerJob.printer_id),
      ),
    ]);

    return {
      printer_jobs: printerJobs.map((printerJob) => ({
        ...printerJob,
        user_file: userFiles.find(
          (userFile) => userFile.id === printerJob.file_id,
        ),
        printer: printers.find(
          (printer) => printer.id === printerJob.printer_id,
        ),
      })),
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

    const userFile = await userFileRepository.getUserFileById(
      printerJob.file_id,
    );
    const printer = await printerRepository.getPrinterById(
      printerJob.printer_id,
    );

    return {
      printer_job: {
        ...printerJob,
        user_file: userFile || undefined,
        printer: printer || undefined,
      },
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
      printer_job: {
        ...printerJob,
        user_file: userFile,
        printer,
      },
    };
  });
};
