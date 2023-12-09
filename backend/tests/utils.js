import fastify from "fastify";

export const buildAppForTests = () => {
  const app = fastify({ logger: false });
  app.get("*", async () => {
    return "Hello World";
  });
  app.post("*", async () => {
    return "Hello World";
  });
  return app;
};

export const getAuthForUser = (userId) => {
  return {};
};
