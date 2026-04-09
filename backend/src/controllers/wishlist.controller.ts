// import { Request, Response, NextFunction } from "express";
// import {
//   toggleWishlistService,
//   getWishlistService,
//   checkWishlistService,
// } from "../services/wishlist.service";

// // 1. TOGGLE LIKE
// export const toggleWishlist = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.user.id;
//     const { eventId } = req.params;

//     const data = await toggleWishlistService(userId, eventId);

//     res.json({ success: true, ...data });
//   } catch (err) {
//     next(err);
//   }
// };

// // 2. GET MY WISHLIST
// export const getWishlist = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.user.id;

//     const data = await getWishlistService(userId);

//     res.json({ success: true, data });
//   } catch (err) {
//     next(err);
//   }
// };

// // 3. CHECK LIKE STATUS
// export const checkWishlist = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.user.id;
//     const { eventId } = req.params;

//     const data = await checkWishlistService(userId, eventId);

//     res.json({ success: true, ...data });
//   } catch (err) {
//     next(err);
//   }
// };