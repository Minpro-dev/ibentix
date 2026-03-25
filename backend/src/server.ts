import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

const PORT = 9000;

// json middleware
app.use(express.json());

// cookie-parser middleware
app.use(cookieParser());

//cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//app config
app.listen(PORT, () => {
  console.log(`🦄 Server is running in port ${PORT}`);
});
