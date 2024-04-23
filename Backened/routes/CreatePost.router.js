import express from 'express'

const  Postrouter=express.Router();

import { verifyToken } from '../utilis/verifyUser.js';
import { create } from '../controllers/CreatePost.controllers.js';

Postrouter
.route('/create')
.post(verifyToken,create)

export default Postrouter