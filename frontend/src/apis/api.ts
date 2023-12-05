import { Configuration, DefaultApi } from "./openapi";

export const API_BASE_PATH = process.env.NEXT_PUBLIC_API_URL;

export const api = new DefaultApi(
  new Configuration({
    basePath: API_BASE_PATH,
    credentials: "include",
  }),
);
