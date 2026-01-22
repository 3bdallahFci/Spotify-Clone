import express from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();
import {
  getAllSongs,
  getSongById,
  featuredSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/song.controller.js";
import { get } from "mongoose";

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/:id", getSongById);
router.get("/featured", featuredSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;
