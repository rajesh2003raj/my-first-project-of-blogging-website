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
export const getPostComment= async(req,res,next)=>{

    try {
         const comments= await Comment.find({postId:req.params.postId}).sort({
          createdAt:-1,
         })   
          
         res
         .status(200)
         .json(comments)

    } catch (error) {
      next(error)
    }

}

 export const getLikes=async(req,res,next)=>{

     try {

          const comment= await Comment.findById(req.params.commentId);
          if(!Comment){
                next(errorHandler(403,'comment not found'))
          }
          const userIndex= comment.likes.indexOf(req.user.id);
          if ( userIndex===-1) {
              // If user's ID is not found in the likes array
               {/* here we do  if not likes then we increase the number of likes by 1 and then put this user into likes so that is alrady exits here    */}
                 comment.numberOfLikes+=1;
                 comment.likes.push(req.user.id);
          } else {
                 comment.numberOfLikes-=1;
                 comment.likes.splice(userIndex,1); 
          }

          await comment.save();
          res.status(200)
          .json(comment);
          
     } catch (error) {
          next(error) 
     }
 }

 export const editcomment=async(req,res,next)=>{
     
     try {
          const comment = await Comment.findById(req.params.commentId);
          if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
          }
          if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(
              errorHandler(403, 'You are not allowed to edit this comment')
            );
          }
      
          const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
              content: req.body.content,
            },
            { new: true }
          );
          res.status(200).json(editedComment);
        } catch (error) {
          next(error);
        }
 }

 export const deleteComment=async(req,res,next)=>{
 
     try {
          const comment = await Comment.findById(req.params.commentId);
          if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
          }
          if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(
              errorHandler(403, 'You are not allowed to delete this comment')
            );
          }
          await Comment.findByIdAndDelete(req.params.commentId);
          res.status(200).json('Comment has been deleted');
        } catch (error) {
          next(error);
        }
      };

 