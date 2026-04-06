import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { createEventCouponSchema } from "../schemas/coupon.schema";
import { couponService } from "../services/coupon.service";

export const couponController = {
  createEventCoupon: catchAsync(
    async (req: Request<{}, {}, createEventCouponSchema>, res: Response) => {
      console.log("req-body -->", req.body);
      const { couponCode, eventId, validFrom, validUntil, discountAmount } =
        req.body;

      const eventCoupon = await couponService.createEventCoupon({
        couponCode,
        eventId,
        validFrom,
        validUntil,
        discountAmount,
      });

      res.status(200).json({
        success: "true",
        data: eventCoupon,
      });
    },
  ),
};
