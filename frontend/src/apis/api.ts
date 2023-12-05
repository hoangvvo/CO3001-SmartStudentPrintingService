import { Configuration, DefaultApi } from "./openapi";

export const API_BASE_PATH = "/api";

export const api = new DefaultApi(
  new Configuration({
    basePath: API_BASE_PATH,
    credentials: "include",
  }),
);
