import fastifyCookie from "@fastify/cookie";
import { fastify } from "fastify";
import { PORT } from "./constants/environments.js";
import { authentication } from "./plugins/auth.js";
import { schemaSetup } from "./plugins/schema.js";
import { printerRouter } from "./routes/printer/route.js";
import { userRouter } from "./routes/user/route.js";

const app = fastify();

app.register(fastifyCookie);

await app.register(authentication);

await app.register(schemaSetup);

await app.register(userRouter, {
  prefix: "/user",
});

await app.register(printerRouter, {
  prefix: "/printer",
});

await app.listen({ port: PORT, host: "0.0.0.0" });

console.log(`Server listening on http://localhost:${PORT}
Swagger documentation on http://localhost:${PORT}/documentation`);
