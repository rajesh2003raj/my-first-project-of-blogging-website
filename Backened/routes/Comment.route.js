import express from "express";
 
 import { verifyToken } from '../utilis/verifyUser.js';
 import { createComment,getPostComment ,getLikes ,deleteComment, editcomment,getComments} from '../controllers/Comment.controllers.js'
const commentRouter=express.Router();
commentRouter
.route('/create/comment')
.post(  verifyToken,createComment);
commentRouter
.route('/getposts/comment/:postId')
.get(getPostComment)

commentRouter
.route('/comment/getlike/:commentId')
.put(verifyToken,getLikes);

commentRouter
.route('/comment/editcomment/:commentId')
.put(verifyToken,editcomment);

commentRouter
.route('/comment/deletecomment/:commentId')
.delete(verifyToken,deleteComment);
 
commentRouter
.route('/comment/getcomments')
.get(verifyToken,getComments);

export default commentRouter;