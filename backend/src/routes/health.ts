import { pool } from "../setup/pool.js";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("backend is running.");
});

router.get("/db", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      status: "ok",
      dbTime: result.rows[0].now,
    });
  } catch (err: any) {
    console.error("DB connection failed:", err.message);
    res.status(500).json({ status: "error", message: err });
  }
});

export default router;
