import {Router} from 'express'
import {  updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utilis/verifyUser.js';

const userRouter=Router();

 
 
  userRouter
  .route('/update/:userId')
  .put(verifyToken,updateUser)


export default userRouter