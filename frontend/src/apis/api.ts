import { Configuration, DefaultApi } from "./openapi";

export const api = new DefaultApi(
  new Configuration({
    basePath: "/api",
  }),
);
