import express from "express";
import cookieParser from "cookie-parser";
const app=express()
app.use(express.json())
app.use(cookieParser());
import path from 'path';

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

 
const __dirname = path.resolve();
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