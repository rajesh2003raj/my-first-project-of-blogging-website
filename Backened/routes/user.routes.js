import {Router} from 'express'
import {  updateUser ,deleteUser, signOut} from '../controllers/user.controller.js';
import { verifyToken } from '../utilis/verifyUser.js';

const userRouter=Router();

 
 
  userRouter
  .route('/update/:userId')
  .put(verifyToken,updateUser)

   userRouter
   .route('/delete/:userId')
   .delete(verifyToken,deleteUser);
   userRouter
   .route('/signout')
   .post(signOut)

export default userRouter