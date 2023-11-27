import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import { fastify } from "fastify";
import { PORT } from "./constants/environments.js";
import { authentication } from "./plugins/auth.js";
import { schemaSetup } from "./plugins/schema.js";
import { fileRouter } from "./routes/file/route.js";
import { printerJobRouter } from "./routes/printer-job/route.js";
import { printerRouter } from "./routes/printer/route.js";
import { systemConfigurationRouter } from "./routes/system-configuration/route.js";
import { userRouter } from "./routes/user/route.js";

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
  disableRequestLogging: true,
});

app.register(fastifyCookie);
app.register(fastifyMultipart);

await app.register(authentication);

await app.register(schemaSetup);

await app.register(userRouter, {
  prefix: "/users",
});

await app.register(printerRouter, {
  prefix: "/printers",
});

await app.register(fileRouter, {
  prefix: "/files",
});

await app.register(printerJobRouter, {
  prefix: "/printer-jobs",
});

await app.register(systemConfigurationRouter, {
  prefix: "/system-configuration",
});

app.setErrorHandler(function (error, request, reply) {
  this.log.error(error);
  reply.send(error);
});

await app.listen({ port: PORT, host: "0.0.0.0" });

console.log(`Server listening on http://localhost:${PORT}
Swagger documentation on http://localhost:${PORT}/documentation`);
