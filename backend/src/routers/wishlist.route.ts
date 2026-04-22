import { Router } from "express";
import {
  toggleWishlist,
  getWishlist,
  //   checkWishlist,
} from "../controllers/wishlist.controller";
import { authentication, authorization } from "../middleware/auth.middleware";

const router = Router();

// LIKE / UNLIKE
router.post("/:eventId", authentication, toggleWishlist);

// GET MY WISHLIST
router.get("/", authentication, getWishlist);

export default router;
