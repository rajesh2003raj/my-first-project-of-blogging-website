import User from '../models/user.models.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utilis/error.js';
const SignUP= async (req,res,next)=>{
    console.log(req.body);
     const {userName,email,password}=req.body;
     if(!userName || !email || !password ||
         userName===""|| email==="" ||
          password===""){

            next(errorHandler(400,'all field is mandatory'))
        
     }
     // here we create new users 
      const hashedPassword=bcryptjs.hashSync(password,12);
     const newUser=new User({
        userName,
        email,
          password: hashedPassword
     })

     // save to the database
     try{
         await newUser.save();
         res.json({
            message: 'we successfully signup!'
         })
     }
     catch(err){
         next(err)
     }
     
}

export {SignUP}