import {Router} from 'express'
import { test } from '../controllers/user.controller.js';
const userRouter=Router();

  userRouter.route('/test')
  .get(test)
 


export default userRouter