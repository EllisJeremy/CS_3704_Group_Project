import { pool } from "../../setup/pool.js";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const obfuscatedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO accounts (email, password_hash)
       VALUES ($1, $2)
       RETURNING id`,
      [email, obfuscatedPassword],
    );

    res.status(201).json({ success: true });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
    console.error(error);
  }
});

export default router;
