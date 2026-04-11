import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import authRouter from "./routers/auth.route";
import couponRouter from "./routers/coupon.route";
import appCouponRouter from "./routers/appCoupon.router";
import orderCouponRouter from "./routers/order.router";
// import eventRouter from "./routers/event.route";
import eventRouter from "./routers/event.route";
// import organizerRouter from "./routers/organizer.route";
// import wishlistRouter from "./routers/wishlist.route";
import paymentRouter from "./routers/payment.route";
import pointRouter from "./routers/point.route";
import referralCouponRouter from "./routers/referralCoupon.route";

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

// event-coupon endpoint
app.use("/api/event-coupon", couponRouter);

// event endpoint
app.use("/api/events", eventRouter);

// organizer endpoint
// app.use('/api/organizer', organizerRouter);

// auth endpoint
app.use("/api/auth", authRouter);

// app-coupon
app.use("/api/app-coupon", appCouponRouter);

// wishlist endpoint
// app.use("/api/wishlist", wishlistRouter);

// order end point
app.use("/api/order", orderCouponRouter);

// order end point
app.use("/api/payment", paymentRouter);

// point end point
app.use("/api/point", pointRouter);

// referralCoupon end point
app.use("/api/referral-coupon", referralCouponRouter);

// error middleware
app.use(globalErrorHandler);

//app config
app.listen(PORT, () => {
  console.log(`🦄 Server is running in port ${PORT}`);
});
