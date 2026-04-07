import { Request, Response } from 'express';
import * as organizerService from '../services/organizer.service';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

// 1. GET PROFILE
export const getProfile = catchAsync(async (req: any, res: Response) => {
  if (!req.user?.id) throw new AppError(401, 'Unauthorized');

  const result = await organizerService.getOrganizerProfileService(req.user.id);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

// 2. UPDATE PROFILE
export const updateProfile = catchAsync(async (req: any, res: Response) => {
  if (!req.user?.id) throw new AppError(401, 'Unauthorized');

  const result = await organizerService.updateOrganizerProfileService(
    req.user.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    message: 'Profile updated',
    data: result,
  });
});



// 3. GET ORDERS
export const getOrders = catchAsync(async (req: any, res: Response) => {
  const result = await organizerService.getOrdersService(
    req.user.id,
    req.query
  );

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

// 5. UPDATE ORDER STATUS
export const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { status } = req.body;

  if (!status) throw new AppError(400, 'status is required');

  const result = await organizerService.updateOrderStatusService(order_id as string, status);

  res.status(200).json({
    status: 'success',
    message: 'Order updated',
    data: result,
  });
});

// 6. GET ATTENDEES
export const getAttendees = catchAsync(async (req: Request, res: Response) => {
  const { event_id } = req.params;

  const result = await organizerService.getAttendeesService(event_id as string);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

// 7. CREATE COUPON
export const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const { event_id } = req.params;

  const result = await organizerService.createCouponService(event_id as string, req.body);

  res.status(201).json({
    status: 'success',
    message: 'Coupon created',
    data: result,
  });
});

// 8. GET COUPONS
export const getCoupons = catchAsync(async (req: Request, res: Response) => {
  const { event_id } = req.params;

  const result = await organizerService.getCouponsService(event_id as string);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

// 9. DASHBOARD
export const getDashboard = catchAsync(async (req: any, res: Response) => {
  const result = await organizerService.getDashboardService(req.user.id);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});