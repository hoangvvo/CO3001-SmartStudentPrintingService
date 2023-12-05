import pg from "pg";
import { DATABASE_URL } from "../constants/environments.js";

export const pool = new pg.Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  connectionString: DATABASE_URL,
});
