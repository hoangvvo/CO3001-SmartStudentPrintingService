import createError from "@fastify/error";

export const InvalidCredentialsError = createError(
  "InvalidCredentialsError",
  "Email or password is incorrect",
  401,
);
