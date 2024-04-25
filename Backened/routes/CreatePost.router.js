import express from 'express'

const  Postrouter=express.Router();

import { verifyToken } from '../utilis/verifyUser.js';
import { create ,getpost} from '../controllers/CreatePost.controllers.js';

Postrouter
.route('/create')
.post(verifyToken,create)
 
Postrouter
.route('/getpost')
.get(getpost);

export default Postrouter