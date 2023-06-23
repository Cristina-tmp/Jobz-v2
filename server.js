import "express-async-errors";
import express from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

//db and auth
import connectDB from "./DB/connect.js";
import authRouter from "./routes/authRoute.js";
import jobRouter from "./routes/jobRoute.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandleMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

//make json available to controllers
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  //throw new Error("This is a test error");
  res.send("Hello from express");
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});
//use the controllers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5005;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECTION_STRING);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
