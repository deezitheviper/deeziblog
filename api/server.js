import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from './routes/Post.js';
import userRouter from './routes/User.js';
import authRouter from './routes/Auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config()

app.use(express.json())
app.use(cookieParser())
if(process.env.NODE_ENV === 'dev'){
    app.use(cors({
        origin:process.env.CLIENT_URL
    }))
}

//Database
const connect = async  () => {
    const connection = await mongoose.connect(process.env.MONGODB)
    .catch(
        err => {
            console.log(err)
        }
    )
    console.log(`DB connected on database named ${connection.connection.name}`)
}


mongoose.connection.on('connected', () => {
    console.log("Connected")
  }); 

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected")
  });


//Routes
app.get('/', (req, res)=>{
    res.send("Hello")
})
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

app.use((err,req,res,next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Unable to complete request"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})


app.listen(5000,() => {
    connect()
    console.log("Connected!")
})