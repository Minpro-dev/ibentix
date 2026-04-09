// import { Router } from 'express';
// import {
//   getProfile,
//   updateProfile,
//   getOrders,
//   updateOrderStatus,
//   getAttendees,
//   getDashboard,
// } from '../controllers/organizer.controller';

// import { authentication, authorization } from '../middleware/auth.middleware';

// const route = Router();

// // protect all routes
// route.use(authentication, authorization('ORGANIZER'));

// // PROFILE
// route.get('/profile', getProfile);
// route.patch('/profile', updateProfile);


// // ORDERS
// route.get('/orders', getOrders);
// route.patch('/orders/:order_id/status', updateOrderStatus);

// // ATTENDEES
// route.get('/events/:event_id/attendees', getAttendees);


// // DASHBOARD
// route.get('/dashboard', getDashboard);

// export default route;