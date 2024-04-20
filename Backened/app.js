import express from "express";
import cookieParser from "cookie-parser";
const app=express()
app.use(express.json())
app.use(cookieParser());


// here we write about router
import UserRouter from './routes/user.routes.js'
app.use('/api/v1',UserRouter);
 import authRouter from './routes/auth.route.js'

 app.use('/api/v1',authRouter)
// here we create error handling middleware 
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