import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { TypeStringDate } from "../../utils/typebox.js";
import { userSchema } from "../user/schema.js";

export const userFileSchema = Type.Object(
  {
    id: Type.Number(),
    user_id: Type.Number(),
    file_name: Type.String(),
    file_size: Type.Number(),
    file_type: Type.String(),
    file_path: Type.String(),
    created_at: TypeStringDate(),
    user: Type.Optional(Type.Ref(userSchema)),
  },
  {
    $id: "UserFile",
    title: "UserFile",
  },
);

export const userFileGetSchema = {
  operationId: "getUserFile",
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    200: Type.Object({
      file: Type.Ref(userFileSchema),
    }),
  },
} satisfies FastifySchema;

export const userFileListSchema = {
  operationId: "listUserFiles",
  response: {
    200: Type.Object({
      files: Type.Array(Type.Ref(userFileSchema)),
    }),
  },
} satisfies FastifySchema;

export const userFileCreateSchema = {
  operationId: "createUserFile",
  response: {
    200: Type.Object({
      file: Type.Ref(userFileSchema),
    }),
  },
} satisfies FastifySchema;

export const userFileDeleteSchema = {
  operationId: "deleteUserFile",
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    204: Type.Null(),
  },
} satisfies FastifySchema;

export const userFileDownloadSchema = {
  operationId: "downloadUserFile",
  params: Type.Object({
    id: Type.Number(),
  }),
} satisfies FastifySchema;
