import Comment from '../models/Comment.model.js'
import { errorHandler } from '../utilis/error.js';

export const createComment= async(req,res,next)=>{

    try {
        const{ userId ,postId,content }=req.body;

        if(req.user.id!==userId){
             return next(errorHandler(403,'Not Allowed to comment '))
        }
        const newcomment = new Comment({
             userId,
             content,
             postId
        }) ;
         await newcomment.save();
         res
         .status(200)
         .json(newcomment);
        
    } catch (error) {
         next(error) 
    }
}