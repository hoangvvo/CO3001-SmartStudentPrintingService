import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const envSchemaSchema = Type.Object({
  DATABASE_URL: Type.String(),
  PORT: Type.Number({
    default: 4000,
  }),
});

const { DATABASE_URL, PORT } = envSchema<Static<typeof envSchemaSchema>>({
  schema: envSchemaSchema,
  dotenv: true,
});

export { DATABASE_URL, PORT };
