import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import cloudinary from 'cloudinary';

import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173", "https://blog-aura.vercel.app"],
  credentials: true,
}));

app.use(cookieParser());

// Image upload with Cloudinary
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  
  cloudinary.v2.uploader.upload_stream(
    {
      resource_type: 'auto', 
      public_id: req.body.img, 
      folder: "blog_images", 
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Image upload failed", error });
      }
      res.status(200).json({
        message: "Image has been uploaded successfully!",
        url: result.secure_url, 
      });
    }
  ).end(req.file.buffer); 
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
