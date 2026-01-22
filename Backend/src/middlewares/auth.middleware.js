import User from "../models/user.model.js";
import { clerkClient } from "@clerk/express";

export const protectRoute = (req,res,next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try {
        const clerkUser = await clerkClient.users.getUser(req.auth.userId);
        const email = clerkUser.primaryEmailAddress?.emailAddress;
        const isAdmin = email === process.env.ADMIN_EMAIL;
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }
        next();
    } catch (error) {
        console.log("RequireAdmin error", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}