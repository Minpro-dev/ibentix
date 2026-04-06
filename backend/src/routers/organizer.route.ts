import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getMyEvents,
  getOrders,
  updateOrderStatus,
  getAttendees,
  createCoupon,
  getCoupons,
  getDashboard,
} from '../controllers/organizer.controller';

import { authentication, authorization } from '../middleware/auth.middleware';

const route = Router();

// protect all routes
route.use(authentication, authorization('ORGANIZER'));

// PROFILE
route.get('/profile', getProfile);
route.patch('/profile', updateProfile);

// EVENTS
route.get('/events', getMyEvents);

// ORDERS
route.get('/orders', getOrders);
route.patch('/orders/:order_id/status', updateOrderStatus);

// ATTENDEES
route.get('/events/:event_id/attendees', getAttendees);

// COUPONS
route.post('/events/:event_id/coupons', createCoupon);
route.get('/events/:event_id/coupons', getCoupons);

// DASHBOARD
route.get('/dashboard', getDashboard);

export default route;