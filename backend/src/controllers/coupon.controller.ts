import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  createEventCouponSchema,
  deleteEventCouponSchema,
  getAllCouponsQuerySchema,
  getCouponDetailsSchema,
} from "../schemas/eventCoupon.schema";
import { couponService } from "../services/coupon.service";

export const couponController = {
  createEventCoupon: catchAsync(
    async (req: Request<{}, {}, createEventCouponSchema>, res: Response) => {
      const userId = req.user?.userId as string;

      const { couponCode, eventId, validFrom, validUntil, discountAmount } =
        req.body;

      const eventCoupon = await couponService.createEventCoupon({
        userId,
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

  // ------ GET COUPON DETAILS
  getCouponDetails: catchAsync(
    async (req: Request<getCouponDetailsSchema, {}, {}>, res: Response) => {
      const eventCouponId = req.params.eventCouponId;
      const userId = req.user?.userId as string;

      const eventCouponDetails = await couponService.getCouponDetails(
        eventCouponId,
        userId,
      );

      res.status(200).json({
        status: "success",
        data: eventCouponDetails,
      });
    },
  ),

  // --------- GET COUPON DETAILS BY EVENT
  getCouponByEvent: async (req: Request, res: Response) => {
    const eventId = req.params.eventId as string;
    const userId = req.user?.userId as string;

    const couponDetails = await couponService.getCouponByEvent(eventId, userId);

    res.status(200).json({
      status: "success",
      data: couponDetails,
    });
  },

  //------- GET ALL COUPONS
  getAllCoupons: catchAsync(
    async (
      req: Request<{}, {}, {}, getAllCouponsQuerySchema>,
      res: Response,
    ) => {
      const userId = req.user?.userId as string;
      const { eventId, search, validFrom, validUntil, createdAt } = req.query;

      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;
      const coupons = await couponService.getAllCoupons(
        {
          eventId,
          search,
          validFrom,
          validUntil,
          createdAt,
          limit,
          page,
        },
        userId,
      );

      res.status(200).json({
        status: "success",
        data: coupons,
      });
    },
  ),

  // ------- EDIT COUPON
  editCoupon: catchAsync(
    async (req: Request<{}, {}, createEventCouponSchema>, res: Response) => {
      const userId = req.user?.userId as string;
      const { couponCode, eventId, validFrom, validUntil, discountAmount } =
        req.body;

      const newCoupon = await couponService.editCoupon({
        userId,
        couponCode,
        eventId,
        validFrom,
        validUntil,
        discountAmount,
      });

      res.status(201).json({
        status: "success",
        message: "Update coupon successfull",
        data: {
          newCoupon,
        },
      });
    },
  ),

  // -------------- DELETE COUPON
  deleteCoupon: catchAsync(
    async (req: Request<{}, {}, deleteEventCouponSchema>, res: Response) => {
      // const userId = req.user?.userId as string;
      const { eventCouponId } = req.body;

      await couponService.deleteCoupon(eventCouponId);

      res.status(200).json({
        staus: "success",
        message: "Delete coupon successful",
      });
    },
  ),
};
