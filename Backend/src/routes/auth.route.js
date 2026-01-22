import express from "express";
import {
  authCallback
} from "../controllers/auth.controller.js";

const router = express.Router();

// router.post("/login", loginUser);
// router.post("/register", registerUser);
// router.post("/logout", logoutUser);
router.post("/callback", authCallback);

export default router;
