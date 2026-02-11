import express from "express";
import { requireAuth } from "@clerk/express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import {
  checkAdmin,
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
} from "../controllers/admin.controller.js";

const router = express.Router();
router.get("/check", protectRoute, requireAdmin, checkAdmin);
router.post("/create-song", protectRoute, requireAdmin, createSong);
router.delete("/delete-song/:id", protectRoute, requireAdmin, deleteSong);
router.post("/create-album", protectRoute, requireAdmin, createAlbum);
router.delete("/delete-album/:id", protectRoute, requireAdmin, deleteAlbum);

export default router;
