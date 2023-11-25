import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { UserRole } from "../../database/types.js";
import { TypeNullable, TypeStringEnum } from "../../utils/typebox.js";

export const userSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    name: Type.String(),
    role: TypeStringEnum(UserRole),
  },
  {
    $id: "User",
    title: "User",
  },
);

export const userGetSchema = {
  operationId: "getCurrentUser",
  response: {
    200: Type.Object({
      user: TypeNullable(Type.Ref<typeof userSchema>(userSchema)),
    }),
  },
} satisfies FastifySchema;

export const userSignUpSchema = {
  operationId: "userSignUp",
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
    name: Type.String(),
  }),
  response: {
    200: Type.Object({
      user: Type.Ref<typeof userSchema>(userSchema),
    }),
  },
} satisfies FastifySchema;

export const userLoginSchema = {
  operationId: "userLogin",
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: {
    200: Type.Object({
      user: Type.Ref<typeof userSchema>(userSchema),
    }),
  },
} satisfies FastifySchema;

export const userLogoutSchema = {
  operationId: "userLogout",
  response: {
    204: Type.Null(),
  },
} satisfies FastifySchema;
