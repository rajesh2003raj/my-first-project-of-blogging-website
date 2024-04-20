import jwt from 'jsonwebtoken'
 import { errorHandler } from '../utilis/error.js'

export const verifyToken= (req,res,next)=>{
    // this token come from user website  so we have access like this okay
    //we have send  cookies access_Token with this name
    const token=req.cookies.access_Token;
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return next(errorHandler(401,'unauthorized user!'))
        }
        req.user=user;
        console.log(req.user);
        next();
    })

}