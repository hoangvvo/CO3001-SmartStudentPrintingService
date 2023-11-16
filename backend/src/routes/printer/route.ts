import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../constants/errors.js";
import { printerRepository } from "../../database/printer.js";
import {
  printerCreateSchema,
  printerDeleteSchema,
  printerGetSchema,
  printerListSchema,
  printerUpdateSchema,
} from "./schema.js";

export const printerRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: printerListSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const printers = await printerRepository.getPrinters();

    return {
      printers,
    };
  });

  fastify.post("/", { schema: printerCreateSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    if (request.user.role !== "admin" && request.user.role !== "spso") {
      throw new ForbiddenError();
    }

    const printer = await printerRepository.createPrinter(request.body);

    return {
      printer,
    };
  });

  fastify.get("/:id", { schema: printerGetSchema }, async (request) => {
    const printer = await printerRepository.getPrinterById(request.params.id);

    if (!printer) {
      throw new NotFoundError();
    }

    return {
      printer,
    };
  });

  fastify.put("/:id", { schema: printerUpdateSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    if (request.user.role !== "admin" && request.user.role !== "spso") {
      throw new ForbiddenError();
    }

    const printer = await printerRepository.getPrinterById(request.params.id);

    if (!printer) {
      throw new NotFoundError();
    }

    const updatedPrinter = await printerRepository.updatePrinterById(
      request.params.id,
      request.body,
    );

    return {
      printer: updatedPrinter,
    };
  });

  fastify.delete("/:id", { schema: printerDeleteSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    if (request.user.role !== "admin" && request.user.role !== "spso") {
      throw new ForbiddenError();
    }

    const printer = await printerRepository.getPrinterById(request.params.id);

    if (!printer) {
      throw new NotFoundError();
    }

    await printerRepository.deletePrinterById(request.params.id);

    return null;
  });
};
