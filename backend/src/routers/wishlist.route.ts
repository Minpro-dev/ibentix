import { Router } from "express";
import {
  toggleWishlist,
  getWishlist,
//   checkWishlist,
} from "../controllers/wishlist.controller";
import { authentication, authorization } from "../middleware/auth.middleware";
import { verifyAccessToken } from "../utils/token.util";

const router = Router();


// LIKE / UNLIKE
router.post("/:eventId", authentication, toggleWishlist);


// GET MY WISHLIST
router.get("/", authentication, getWishlist);

// // CHECK STATUS
// router.get("/:eventId/status", authentication, checkWishlist);

export default router;