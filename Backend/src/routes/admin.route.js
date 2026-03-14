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
router.get("/check", checkAdmin);
router.post("/create-song", createSong);
router.delete("/delete-song/:id", deleteSong);
router.post("/create-album", createAlbum);
router.delete("/delete-album/:id", deleteAlbum);

export default router;
