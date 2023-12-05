import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const envSchemaSchema = Type.Object({
  DATABASE_URL: Type.String(),
  PORT: Type.Number({
    default: 4000,
  }),
  APP_URL: Type.Optional(Type.String()),
});

const { DATABASE_URL, PORT, APP_URL } = envSchema<
  Static<typeof envSchemaSchema>
>({
  schema: envSchemaSchema,
  dotenv: true,
});

export { APP_URL, DATABASE_URL, PORT };
