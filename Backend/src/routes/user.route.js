import express from "express";

const router = express.Router();
import {
  getAllUsers,getMessages
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.get("/:userId", getAllUsers);
router.get("/messages/:senderId/:receiverId", getMessages);
export default router;
