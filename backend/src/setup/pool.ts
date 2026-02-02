import { Pool } from "pg";
import { env } from "./env.js";

export const pool = new Pool({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  connectionString: env.DATABASE_URL,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
});
