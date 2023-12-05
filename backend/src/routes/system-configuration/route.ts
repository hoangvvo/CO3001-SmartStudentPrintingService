import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ForbiddenError, UnauthorizedError } from "../../constants/errors.js";
import { systemConfigurationRepository } from "../../database/system-configuration.js";
import {
  systemConfigurationGetSchema,
  systemConfigurationUpdateSchema,
} from "./schema.js";

export const systemConfigurationRouter: FastifyPluginAsyncTypebox = async (
  fastify,
) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: systemConfigurationGetSchema }, async () => {
    const systemConfiguration =
      await systemConfigurationRepository.getSystemConfiguration();

    return {
      system_configuration: systemConfiguration || {
        // default
        default_page_balance: 100,
        cron_of_default_page_balance_grant: "0 0 1 1 *",
        permitted_file_types: ["application/pdf", "image/png", "image/jpeg"],
        max_file_size: 1024 * 1024 * 10, // 10MB
      },
    };
  });

  fastify.put(
    "/",
    { schema: systemConfigurationUpdateSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      if (request.user.role !== "admin" && request.user.role !== "spso") {
        throw new ForbiddenError();
      }

      const systemConfiguration =
        await systemConfigurationRepository.upsertSystemConfiguration(
          request.body,
        );

      return {
        system_configuration: systemConfiguration,
      };
    },
  );
};
