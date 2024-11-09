import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';

import { connectDB } from './db/connectDB.js';

import authRoutes from './routes/auth.js';

import usersRoutes from './routes/users.js';

import postsRoutes from './routes/posts.js';

import commentsRoutes from './routes/comments.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: ["http://localhost:5174","https://blog-aura.vercel.app"],
    credentials: true,
}))

app.use(cookieParser());

const __dirname = path.resolve()
app.use("/images",express.static(path.join(__dirname + "/images")))


app.use("/api/auth",authRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/posts",postsRoutes);
app.use("/api/comments",commentsRoutes);

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})