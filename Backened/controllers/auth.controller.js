import User from '../models/user.models.js'
import  bcryptjs from "bcryptjs"
import { errorHandler } from '../utilis/error.js';
import jwt from 'jsonwebtoken'
const SignUP= async (req,res,next)=>{
    console.log(req.body);
     const {userName,email,password}=req.body;
     if(!userName || !email || !password ||
         userName===""|| email==="" ||
          password===""){

            next(errorHandler(400,'all field is mandatory'))
        
     }
     // here we create new users 
      const hashedPassword=bcryptjs.hashSync(password,10);
      // here we create new users
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
const SignIn=async(req,res,next)=>{ 
   
    const {email,password}=req.body;
     
    if(!email || !password || email==="" || password===""){
        return next(errorHandler(400,'both fields are mandatory'))
    }

    // Now we check email  that  exits in our database 
    // if its exits then it return  all  collection that user contains that is password or any other things
    try {
        const validUser=await User.findOne({email})
         if(!validUser){
            return next(errorHandler(400,' wrong password or email'))
         }
         
         // now check password is correct or not using 
         const validPassword= bcryptjs.compareSync(password,validUser.password)
         if(!validPassword){
            return next(errorHandler(400,'wrong password or email'))
         }
         // now we checkd both password and email 
         // now we have to provide token to the user using jwt token 
         // generate tokens here
           const token=jwt.sign({
            id:validUser._id},
            
            process.env.SECRET_KEY,
             { expiresIn:'2h'}
           );
          
           const{ password:pass,...rest}=validUser._doc;
            res.
            status(200)
            .cookie('access_Token',token,{ httpOnly:true})
            .json(rest)
             
    }
     catch (error) {
          next(error)
    }
}

export {SignUP,SignIn}