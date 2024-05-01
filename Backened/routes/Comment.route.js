import express from "express";
 
 import { verifyToken } from '../utilis/verifyUser.js';
 import { createComment } from '../controllers/Comment.controllers.js'
const commentRouter=express.Router();
commentRouter
.route('/create/comment')
.post(  verifyToken,createComment);

export default commentRouter;