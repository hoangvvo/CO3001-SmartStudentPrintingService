import createError from "@fastify/error";

export const UnauthorizedError = createError(
  "UNAUTHORIZED",
  "You must be logged in to access this resource",
  401,
);
export const ForbiddenError = createError(
  "FORBIDDEN",
  "You are not allowed to access this resource",
  403,
);
export const NotFoundError = createError(
  "NOT_FOUND",
  "Resource not found",
  404,
);
export const BadRequestError = createError("BAD_REQUEST", "Bad request", 400);
export const ConflictError = createError("CONFLICT", "Conflict", 409);
