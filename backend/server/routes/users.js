import { Router } from "express";

import UserController from "../controllers/users";
import AuthMiddleware from "../middlewares/auth";


const router = Router();

router.get('/me', AuthMiddleware.authorize,  UserController.getUserProfile);

router.post('/login', UserController.login);

router.post('/register', UserController.registerUser);

export default router;
