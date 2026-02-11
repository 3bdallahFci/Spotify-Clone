import express from "express";
// import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();
import {
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/song.controller.js";
import { get } from "mongoose";

// router.get("/", protectRoute, requireAdmin, getAllSongs);
// router.get("/:id", getSongById);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;
