import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { createWriteStream } from "fs";
import { stat } from "fs/promises";
import { nanoid } from "nanoid";
import { join } from "path";
import { pipeline } from "stream";
import util from "util";
import { ForbiddenError, UnauthorizedError } from "../../constants/errors.js";
import { STORAGE_PATH } from "../../constants/storage.js";
import { userFileRepository } from "../../database/user-file.js";
import {
  userFileCreateSchema,
  userFileDeleteSchema,
  userFileGetSchema,
  userFileListSchema,
} from "./schema.js";

const pump = util.promisify(pipeline);

export const fileRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post("/", { schema: userFileCreateSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const data = await request.file();
    if (!data) {
      throw new Error("No file received");
    }

    const filePath = join(
      request.user.id.toString(),
      nanoid(13),
      data.filename,
    );

    await pump(data.file, createWriteStream(join(STORAGE_PATH, filePath)));

    const fileStats = await stat(join(STORAGE_PATH, filePath));
    const fileSizeInBytes = fileStats.size;

    const fileDbObject = await userFileRepository.createUserFile({
      user_id: request.user.id,
      file_name: data.filename,
      file_size: fileSizeInBytes,
      file_type: data.mimetype,
      file_path: filePath,
    });

    return {
      file: fileDbObject,
    };
  });

  fastify.get("/:id", { schema: userFileGetSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const file = await userFileRepository.getUserFileById(request.params.id);

    if (!file) {
      throw new Error("File not found");
    }

    if (request.user.role === "user" && request.user.id !== file.user_id) {
      throw new ForbiddenError();
    }

    return {
      file,
    };
  });

  fastify.get("/", { schema: userFileListSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const files =
      request.user.role === "user"
        ? await userFileRepository.getUserFilesByUserId(request.user.id)
        : await userFileRepository.getUserFiles();

    return {
      files,
    };
  });

  fastify.delete(
    "/:id",
    { schema: userFileDeleteSchema },
    async (request, reply) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const file = await userFileRepository.getUserFileById(request.params.id);

      if (!file) {
        throw new Error("File not found");
      }

      if (request.user.role === "user" && request.user.id !== file.user_id) {
        throw new ForbiddenError();
      }

      await userFileRepository.deleteUserFileById(request.params.id);

      return reply.status(204).send();
    },
  );
};
