import type { Static, TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export const TypeNullable = <T extends TSchema>(schema: T) =>
  Type.Unsafe<Static<T> | null>({
    ...schema,
    nullable: true,
  });

export const TypeStringEnum = <T extends Record<string, any>>(values: T) =>
  Type.Unsafe<any>({
    type: "string",
    enum: Object.values(values),
  });

export const TypeStringDate = () =>
  Type.Unsafe<Date>({
    type: "string",
    format: "date-time",
  });
