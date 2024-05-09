import express from "express";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import dotenv  from 'dotenv'

dotenv.config();
import path from 'path';


const __dirname = path.resolve();

const app=express()
app.use(express.static(path.join(__dirname, '/client/dist')));

mongoose.connect(process.env.MONGO)
.then(()=>{
   console.log('successfully connected')
   app.listen(process.env.PORT || 8000,()=>{
       console.log(`server is running on this port:${process.env.PORT}`);
   })
})
.catch((err)=>{
   console.log('not connected successfully!');
})







app.use(express.json())
app.use(cookieParser());


// here we write about router
 


import UserRouter from './routes/user.routes.js'
app.use('/api/v1',UserRouter);
 import authRouter from './routes/auth.route.js'

 app.use('/api/v1',authRouter)
// here we create error handling middleware 
 // 
 import   Postrouter from "./routes/CreatePost.router.js";

 app.use('/api/post',Postrouter);

 // here we create Comment Router 
 import commentRouter from "./routes/Comment.route.js";

 app.use('/api/v1/',commentRouter)

 
 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
 });

 app.use((err,req,res,next)=>{
       
    const statuscode=err.statuscode || 500;
    const message=err.message || 'internal server'
    res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
 })

export  {app}



