const express = require('express')

const app = express()

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth')

const userRoute = require('./routes/users')

const postRoute = require('./routes/posts')

const commentRoute=require('./routes/comments')

const cors = require('cors')

const multer = require('multer')

const path = require('path')

//database

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log("database is connected succesfully")
    } catch (error) {
        console.log(error)
    }
}

//middlewares

const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-aura-frontend.vercel.app"
];

dotenv.config()

app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use("/api/comments",commentRoute)

//image upload
const storage = multer.diskStorage({
    destination: (req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn) => {
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})

app.post("/api/upload" , upload.single("file"),(req,res) => {
    res.status(200).json("Image has been uploaded succesfully !")
})


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port " + process.env.PORT )
})
