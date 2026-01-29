import express from "express";
import { pool } from "../setup/pool";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM accounts 
      `,
    );

    res.json({ accounts: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
