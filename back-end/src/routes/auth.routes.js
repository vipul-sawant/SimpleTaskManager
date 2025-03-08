import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyUser } from "../controllers/auth.controller.js";
import verifyLogin from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/verify-login').get(verifyLogin, verifyUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyLogin, logoutUser);

export default router;