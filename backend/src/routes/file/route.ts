import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { createReadStream, createWriteStream } from "fs";
import { mkdir, stat } from "fs/promises";
import { nanoid } from "nanoid";
import { join } from "path";
import { pipeline } from "stream";
import util from "util";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../constants/errors.js";
import { STORAGE_PATH } from "../../constants/storage.js";
import { appUserRepository } from "../../database/app-user.js";
import { userFileRepository } from "../../database/user-file.js";
import {
  userFileCreateSchema,
  userFileDeleteSchema,
  userFileDownloadSchema,
  userFileGetSchema,
  userFileListSchema,
} from "./schema.js";

const pump = util.promisify(pipeline);

export const fileRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.post("/", { schema: userFileCreateSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const data = await request.file();
    if (!data) {
      throw new Error("No file received");
    }

    const fileDir = join(request.user.id.toString(), nanoid(11));
    // create file dir if not exists
    await mkdir(join(STORAGE_PATH, fileDir), { recursive: true });

    const filePath = join(fileDir, data.filename);
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
      throw new NotFoundError();
    }

    if (request.user.role === "user" && request.user.id !== file.user_id) {
      throw new ForbiddenError();
    }

    const user = await appUserRepository.getUserById(file.user_id);

    return {
      file: {
        ...file,
        user: user ?? undefined,
      },
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

    const users = await appUserRepository.getUsersByIds(
      files.map((file) => file.user_id),
    );

    return {
      files: files.map((file) => ({
        ...file,
        user: users.find((user) => user.id === file.user_id),
      })),
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

  fastify.get(
    `/:id/download`,
    { schema: userFileDownloadSchema },
    async (request, reply) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const file = await userFileRepository.getUserFileById(request.params.id);

      if (!file) {
        throw new NotFoundError();
      }

      if (request.user.role === "user" && request.user.id !== file.user_id) {
        throw new ForbiddenError();
      }

      const filePath = join(STORAGE_PATH, file.file_path);

      reply.header(
        "Content-Disposition",
        `attachment; filename="${file.file_name}"`,
      );

      const stats = await stat(filePath);

      const stream = createReadStream(filePath);

      reply.header("Content-Length", stats.size);
      return reply.type(file.file_type).send(stream);
    },
  );
};
