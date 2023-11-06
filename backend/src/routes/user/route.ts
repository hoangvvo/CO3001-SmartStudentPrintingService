import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ConflictError, UnauthorizedError } from "../../constants/errors.js";
import { appUserRepository } from "../../database/app-user.js";
import { authService } from "../../services/auth.js";
import {
  userGetSchema,
  userLoginSchema,
  userLogoutSchema,
  userSignUpSchema,
} from "./schema.js";

export const userRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: userGetSchema }, async (request) => {
    return {
      user: request.user,
    };
  });

  fastify.post(
    "/signup",
    { schema: userSignUpSchema },
    async (request, reply) => {
      const { email, password, name } = request.body;

      const user = await appUserRepository.getUserByEmail(email);

      if (user) {
        throw new ConflictError("Email already in use");
      }

      const passwordHash = await authService.hashPassword(password);

      const newUser = await appUserRepository.createUser({
        email,
        password_hash: passwordHash,
        name,
      });

      const { token: authToken, expiresAt } = await authService.createSession(
        newUser.id,
      );

      reply.setCookie("authToken", authToken, {
        httpOnly: true,
        path: "/",
        expires: expiresAt,
      });

      return {
        user: newUser,
      };
    },
  );

  fastify.post(
    "/login",
    { schema: userLoginSchema },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await appUserRepository.getUserByEmail(email);

      if (!user) {
        throw new UnauthorizedError("Email or password is incorrect");
      }

      const passwordMatch = await authService.comparePassword(
        password,
        user.password_hash,
      );

      if (!passwordMatch) {
        throw new UnauthorizedError("Email or password is incorrect");
      }

      const { token: authToken, expiresAt } = await authService.createSession(
        user.id,
      );

      reply.setCookie("authToken", authToken, {
        httpOnly: true,
        path: "/",
        expires: expiresAt,
      });

      return {
        user,
      };
    },
  );

  fastify.post(
    "/logout",
    { schema: userLogoutSchema },
    async (request, reply) => {
      const { authToken } = request.cookies;

      if (authToken) {
        await authService.deleteSession(authToken);

        reply.setCookie("authToken", "", {
          httpOnly: true,
          path: "/",
          expires: new Date(0),
        });
      }

      return null;
    },
  );
};
