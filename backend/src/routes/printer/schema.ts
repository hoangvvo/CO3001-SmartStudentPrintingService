import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { PrinterCapability } from "../../database/types.js";
import { TypeNullable } from "../../utils/typebox.js";

export const printerSchema = Type.Object({
  id: Type.Number(),
  brand_name: TypeNullable(Type.String()),
  model_name: TypeNullable(Type.String()),
  capabilities: Type.Array(Type.Enum(PrinterCapability)),
});

export const printerGetSchema = {
  operationId: "getPrinter",
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    200: Type.Object({
      printer: Type.Ref<typeof printerSchema>(printerSchema),
    }),
  },
} satisfies FastifySchema;

export const printerListSchema = {
  operationId: "listPrinters",
  response: {
    200: Type.Object({
      printers: Type.Array(Type.Ref<typeof printerSchema>(printerSchema)),
    }),
  },
} satisfies FastifySchema;

export const printerCreateSchema = {
  operationId: "createPrinter",
  body: Type.Object({
    brand_name: TypeNullable(Type.String()),
    model_name: TypeNullable(Type.String()),
    capabilities: Type.Array(Type.Enum(PrinterCapability)),
    location: TypeNullable(Type.String()),
    printer_address: Type.String(),
  }),
  response: {
    200: Type.Object({
      printer: Type.Ref<typeof printerSchema>(printerSchema),
    }),
  },
} satisfies FastifySchema;

export const printerUpdateSchema = {
  operationId: "updatePrinter",
  params: Type.Object({
    id: Type.Number(),
  }),
  body: Type.Object({
    brand_name: TypeNullable(Type.String()),
    model_name: TypeNullable(Type.String()),
    capabilities: Type.Array(Type.Enum(PrinterCapability)),
    location: TypeNullable(Type.String()),
    printer_address: Type.String(),
    is_enabled: Type.Boolean(),
  }),
  response: {
    200: Type.Object({
      printer: Type.Ref<typeof printerSchema>(printerSchema),
    }),
  },
} satisfies FastifySchema;

export const printerDeleteSchema = {
  operationId: "deletePrinter",
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    204: Type.Null(),
  },
} satisfies FastifySchema;
