import { Request, Response, NextFunction } from "express";
import {
  toggleWishlistService,
  getWishlistService,
//   checkWishlistService,
} from "../services/wishlist.service";

// 1. TOGGLE LIKE
// export const toggleWishlist = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.user?.userId as string;
//     const eventId = req.body.eventId;
//     //  const eventId = req.params.eventId as string;


//     const data = await toggleWishlistService(userId, eventId);

//     res.json({ success: true, ...data });
//   } catch (err) {
//     next(err);
//   }
// };

export const toggleWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    const eventId = req.params.eventId as string;


    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!eventId) {
      return res.status(400).json({ message: "eventId is required" });
    }

    const data = await toggleWishlistService(userId, eventId);

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (err) {
    console.error("ERROR TOGGLE:", err);
    next(err);
  }
};

// 2. GET MY WISHLIST
export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;

    const data = await getWishlistService(userId);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

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