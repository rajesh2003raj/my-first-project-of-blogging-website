import {Router} from 'express'
import {  updateUser ,deleteUser, signOut, getUsers,getUser} from '../controllers/user.controller.js';
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
  
   userRouter
   .route('/user/getUsers')
   .get(verifyToken,getUsers);
   userRouter
   .route('/:userId')
   .get(getUser)
  
export default userRouter