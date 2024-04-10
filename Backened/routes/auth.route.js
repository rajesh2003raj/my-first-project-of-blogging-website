import { Router } from "express"; 
import { SignUP } from "../controllers/auth.controller.js";

const authRouter=Router();

authRouter
.route('/signup')
.post(SignUP)

export default authRouter