import { Router } from "express"; 
import { SignUP ,SignIn, google} from "../controllers/auth.controller.js";

const authRouter=Router();

authRouter
.route('/signup')
.post(SignUP)

 authRouter
 .route('/signin')
 .post(SignIn)

 authRouter
 .route('/googleauth')
 .post(google)
export default authRouter