import express, { Request, Response } from "express";
import { pool } from "../../setup/pool.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../setup/env.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router = express.Router();

router.post("", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const {
      rows: [user],
    } = await pool.query(
      `
      SELECT id, email, password_hash
      FROM accounts
      WHERE email = $1
      `,
      [email],
    );

    const backUpHash = "$2b$10$stn5DE/DAtvWOGMw4xywfuauxmtsbD7wyXP9/1oEitpFbGinvalid";

    const hash = user?.password_hash ?? backUpHash;
    const valid = await bcrypt.compare(password, hash);

    if (!user || !valid) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// this is the res when a user has the cookie in their browser after refresh
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
