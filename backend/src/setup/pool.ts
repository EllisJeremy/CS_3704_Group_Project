import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  connectionString: process.env.DATABASE_URL,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.POSTGRES_DB,
});
