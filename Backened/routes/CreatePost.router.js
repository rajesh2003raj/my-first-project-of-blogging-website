import express from 'express'

const  Postrouter=express.Router();

import { verifyToken } from '../utilis/verifyUser.js';
import { create ,getpost,deletePost} from '../controllers/CreatePost.controllers.js';

Postrouter
.route('/create')
.post(verifyToken,create)
 
Postrouter
.route('/getpost')
.get(getpost)
Postrouter
.route('/deletepost/:postId/:userId')
.delete(verifyToken,deletePost)

export default Postrouter