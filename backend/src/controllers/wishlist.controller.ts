import { Request, Response, NextFunction } from "express";
import {
  toggleWishlistService,
  getWishlistService,
  //   checkWishlistService,
} from "../services/wishlist.service";

export const toggleWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const eventId = req.params.eventId as string;

    // console.log("=== TOGGLE WISHLIST ===");
    // console.log("User:", userId);
    // console.log("Event:", eventId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!eventId) {
      return res.status(400).json({ message: "eventId is required" });
    }

    const result = await toggleWishlistService(userId, eventId);

    res.status(200).json({
      status: "success",
      liked: result.liked,
      message: result.message,
    });
  } catch (err) {
    console.error("ERROR TOGGLE WISHLIST:", err);
    next(err);
  }
};

// 2. GET MY WISHLIST
export const getWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
