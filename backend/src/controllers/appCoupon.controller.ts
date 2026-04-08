import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { appCouponService } from "../services/appCoupon.service";

export const appCouponController = {
  createAppCoupon: catchAsync(async (req: Request, res: Response) => {
    const appCoupon = await appCouponService.createAppCoupon(req.body);

    res.status(201).json({
      status: "success",
      message: "App coupon is created successfully",
      data: appCoupon,
    });
  }),
};
