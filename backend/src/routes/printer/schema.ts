import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { PrinterCapability } from "../../database/types.js";
import { TypeNullable, TypeStringEnum } from "../../utils/typebox.js";

export const printerSchema = Type.Object(
  {
    id: Type.Number(),
    brand_name: TypeNullable(Type.String()),
    model_name: TypeNullable(Type.String()),
    capabilities: Type.Array(TypeStringEnum(PrinterCapability)),
    location: TypeNullable(Type.String()),
    printer_address: Type.String(),
    is_enabled: Type.Boolean(),
    image_url: TypeNullable(Type.String()),
    paper_sizes: Type.Array(Type.String()),
    paper_count: Type.Number(),
  },
  {
    $id: "Printer",
    title: "Printer",
  },
);

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
    capabilities: Type.Array(TypeStringEnum(PrinterCapability)),
    location: TypeNullable(Type.String()),
    printer_address: Type.String(),
    image_url: TypeNullable(Type.String()),
    paper_sizes: Type.Array(Type.String()),
    paper_count: Type.Number(),
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
    capabilities: Type.Array(TypeStringEnum(PrinterCapability)),
    location: TypeNullable(Type.String()),
    printer_address: Type.String(),
    is_enabled: Type.Boolean(),
    image_url: TypeNullable(Type.String()),
    paper_sizes: Type.Array(Type.String()),
    paper_count: Type.Number(),
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
