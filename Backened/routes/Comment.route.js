import express from "express";
 
 import { verifyToken } from '../utilis/verifyUser.js';
 import { createComment,getPostComment } from '../controllers/Comment.controllers.js'
const commentRouter=express.Router();
commentRouter
.route('/create/comment')
.post(  verifyToken,createComment);
commentRouter
.route('/getposts/comment/:postId')
.get(getPostComment)

export default commentRouter;