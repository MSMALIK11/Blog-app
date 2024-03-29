import express from "express";
import Router from "./routes/router.js";
import cors from "cors";
import expressFileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import { connection } from "./database/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./database/.env" });

const app = express();
let PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(expressFileupload({ useTempFiles: true }));
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());

app.use("/", Router);

app.listen(PORT, () => {
  console.log(`server is running at port no. ${PORT}`);
});

connection();
