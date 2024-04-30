import express from 'express'

const  Postrouter=express.Router();

import { verifyToken } from '../utilis/verifyUser.js';
import { create ,getposts,deletePost,updatepost} from '../controllers/CreatePost.controllers.js';

Postrouter
.route('/create')
.post(verifyToken,create)
 


Postrouter 
.route('/getposts')
.get(getposts)
Postrouter
.route('/deletepost/:postId/:userId')
.delete(verifyToken,deletePost)
Postrouter
.route('/updatepost/:postId/:userId')
.put(verifyToken,updatepost)

export default Postrouter