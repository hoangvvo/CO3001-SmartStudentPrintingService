import type { preHandlerAsyncHookHandler } from "fastify";
import fp from "fastify-plugin";
import { appSessionRepository } from "../database/app-session.js";
import type { UserDbObject } from "../database/types.js";

declare module "fastify" {
  interface FastifyInstance {
    auth: preHandlerAsyncHookHandler;
  }
  interface FastifyRequest {
    user: UserDbObject | null;
  }
}

export const authentication = fp(async (fastify) => {
  fastify.decorate<preHandlerAsyncHookHandler>("auth", async (request) => {
    if (request.user) {
      return;
    }
    const authToken = request.cookies.authToken;
    if (authToken) {
      const user = await appSessionRepository.getUserBySessionToken(authToken);
      request.user = user;
    } else {
      request.user = null;
    }
  });
});
