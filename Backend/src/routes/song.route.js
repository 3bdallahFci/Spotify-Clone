import express from "express";
// import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/song.controller.js";

// router.get("/", protectRoute, requireAdmin, getAllSongs);
// router.get("/:id", getSongById);
router.get("/", getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;
