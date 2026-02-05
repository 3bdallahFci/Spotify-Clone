import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import path from "path";
// import usersRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
// import songsRoutes from "./routes/song.route.js";
import albumsRoutes from "./routes/album.route.js";
// import statsRoutes from "./routes/stat.route.js";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
const __dirname = path.resolve();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../temp/"),
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  }),
);
app.use(clerkMiddleware());
app.use(bodyParser.json());
// app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
// app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumsRoutes);
// app.use("/api/stats", statsRoutes);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
  mongoose
    .connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/spotify_clone_db",
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
