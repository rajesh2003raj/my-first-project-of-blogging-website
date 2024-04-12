import { Router } from "express"; 
import { SignUP ,SignIn} from "../controllers/auth.controller.js";

const authRouter=Router();

authRouter
.route('/signup')
.post(SignUP)

 authRouter
 .route('/signin')
 .post(SignIn)

export default authRouter