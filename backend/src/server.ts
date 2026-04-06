import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import authRouter from "./routers/auth.route";
import couponRouter from "./routers/coupon.route";

const app: Express = express();

const PORT = 8000;

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

// coupon endpoint
app.use("/api/coupon", couponRouter);

// auth endpoint
app.use("/api/auth", authRouter);

// error middleware
app.use(globalErrorHandler);

//app config
app.listen(PORT, () => {
  console.log(`🦄 Server is running in port ${PORT}`);
});
