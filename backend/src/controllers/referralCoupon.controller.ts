import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { referralCouponService } from "../services/referralCoupon.service";

export const referralCouponController = {
  getReferralCouponDetails: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const couponDetails =
      await referralCouponService.getReferralCouponDetails(userId);

    res.status(200).json({
      status: "success",
      message: "Get referral coupon detail successfull",
      data: couponDetails,
    });
  }),
};
