import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { appCouponService } from "../services/appCoupon.service";
import {
  ChangeAppCouponStatusSchema,
  CreateAppCouponSchema,
  DeleteAppCouponSchema,
} from "../schemas/appCoupon.schema";

export const appCouponController = {
  // CREATE
  createAppCoupon: catchAsync(
    async (req: Request<{}, {}, CreateAppCouponSchema>, res: Response) => {
      const appCoupon = await appCouponService.createAppCoupon(req.body);

      res.status(201).json({
        status: "success",
        message: "App coupon is created successfully",
        data: appCoupon,
      });
    },
  ),

  // GET ALL
  getAllAppCoupon: catchAsync(async (req: Request, res: Response) => {
    const appCoupons = await appCouponService.getAllCoupon();

    res.status(200).json({
      status: "success",
      message: "Fetch app coupon data successfull",
      data: appCoupons,
    });
  }),

  // DELETE
  deleteAppCoupon: catchAsync(
    async (req: Request<{}, {}, DeleteAppCouponSchema>, res: Response) => {
      const { appCouponId } = req.body;

      await appCouponService.deleteCoupon(appCouponId);

      res.status(200).json({
        status: "success",
        message: "App coupon deleted successful",
      });
    },
  ),

  // CHANGE COUPON STATUS
  changeCouponStatus: catchAsync(
    async (
      req: Request<{}, {}, ChangeAppCouponStatusSchema>,
      res: Response,
    ) => {
      const appCouponId = req.body.appCouponId;

      const updatedAppCoupon =
        await appCouponService.changeCouponStatus(appCouponId);

      res.status(201).json({
        status: "success",
        message: "Update app coupon status successfull",
        data: updatedAppCoupon,
      });
    },
  ),
};
