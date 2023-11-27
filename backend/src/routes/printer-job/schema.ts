import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { PrintOrientation, PrinterJobStatus } from "../../database/types.js";
import {
  TypeNullable,
  TypeStringDate,
  TypeStringEnum,
} from "../../utils/typebox.js";

export const printerJobSchema = Type.Object(
  {
    id: Type.Number(),
    status: TypeStringEnum(PrinterJobStatus),
    printer_id: Type.Number(),
    user_id: Type.Number(),
    file_id: Type.Number(),
    start_time: TypeStringDate(),
    end_time: TypeNullable(TypeStringDate()),
    page_size: Type.String(),
    page_count: Type.Number(),
    double_side: TypeNullable(Type.Boolean()),
    color: TypeNullable(Type.Boolean()),
    orientation: TypeNullable(TypeStringEnum(PrintOrientation)),
  },
  {
    $id: "PrinterJob",
    title: "PrinterJob",
  },
);

export const printerJobGetSchema = {
  operationId: "getPrinterJob",
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    200: Type.Object({
      printer_job: Type.Ref<typeof printerJobSchema>(printerJobSchema),
    }),
  },
} satisfies FastifySchema;

export const printerJobListSchema = {
  operationId: "listPrinterJobs",
  response: {
    200: Type.Object({
      printer_jobs: Type.Array(
        Type.Ref<typeof printerJobSchema>(printerJobSchema),
      ),
    }),
  },
} satisfies FastifySchema;

export const printerJobCreateSchema = {
  operationId: "createPrinterJob",
  body: Type.Object({
    printer_id: Type.Number(),
    file_id: Type.Number(),
    page_size: Type.String(),
    page_count: Type.Number(),
    double_side: TypeNullable(Type.Boolean()),
    color: TypeNullable(Type.Boolean()),
    orientation: TypeNullable(TypeStringEnum(PrintOrientation)),
  }),
  response: {
    200: Type.Object({
      printer_job: Type.Ref<typeof printerJobSchema>(printerJobSchema),
    }),
  },
} satisfies FastifySchema;
