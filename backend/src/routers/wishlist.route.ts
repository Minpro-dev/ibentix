import { Router } from "express";
import {
  toggleWishlist,
  getWishlist,
  //   checkWishlist,
} from "../controllers/wishlist.controller";
import { authentication } from "../middleware/auth.middleware";

const router = Router();

// LIKE / UNLIKE
router.post("/:eventId", authentication, toggleWishlist);

// GET MY WISHLIST
router.get("/", getWishlist);

export default router;
