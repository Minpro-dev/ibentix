import { Router } from "express";
import {
  toggleWishlist,
  getWishlist,
  checkWishlist,
} from "../controllers/wishlist.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// LIKE / UNLIKE
router.post("/:eventId", verifyToken, toggleWishlist);

// GET MY WISHLIST
router.get("/", verifyToken, getWishlist);

// CHECK STATUS
router.get("/:eventId/status", verifyToken, checkWishlist);

export default router;