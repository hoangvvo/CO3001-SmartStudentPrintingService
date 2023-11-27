import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";

export const systemConfigurationSchema = Type.Object(
  {
    default_page_balance: Type.Number(),
    cron_of_default_page_balance_grant: Type.String(),
    permitted_file_types: Type.Array(Type.String()),
    max_file_size: Type.Integer(),
  },
  {
    $id: "SystemConfiguration",
    title: "SystemConfiguration",
  },
);

export const systemConfigurationGetSchema = {
  operationId: "getSystemConfiguration",
  response: {
    200: Type.Object({
      system_configuration: Type.Ref<typeof systemConfigurationSchema>(
        systemConfigurationSchema,
      ),
    }),
  },
} satisfies FastifySchema;

export const systemConfigurationUpdateSchema = {
  operationId: "updateSystemConfiguration",
  body: Type.Object({
    default_page_balance: Type.Number(),
    cron_of_default_page_balance_grant: Type.String(),
    permitted_file_types: Type.Array(Type.String()),
    max_file_size: Type.Integer(),
  }),
  response: {
    200: Type.Object({
      system_configuration: Type.Ref<typeof systemConfigurationSchema>(
        systemConfigurationSchema,
      ),
    }),
  },
} satisfies FastifySchema;
