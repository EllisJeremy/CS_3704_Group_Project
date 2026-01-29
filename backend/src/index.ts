import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import accounts from "./routes/accounts";
import health from "./routes/health";

// we will need these later if we want to use JWT cookies
// import cookieParser from "cookie-parser";

const port = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      /*TODO: don't forget to add the real url here */
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/accounts", accounts);
app.use("/health", health);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
