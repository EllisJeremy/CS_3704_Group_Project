import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";

import health from "./routes/health.js";
import accounts from "./routes/accounts/accountsIndex.js";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/accounts", accounts);
app.use("/health", health);

app.listen(port);
