import createError from "@fastify/error";

export const PrinterDisabledError = createError(
  "PRINTER_DISABLED",
  "Printer is disabled",
  403,
);
