import { Router } from "express";

import UserController from "../controllers/users";
import AuthMiddleware from "../middlewares/auth";


const router = Router();

router.get('/me', AuthMiddleware.authorize, UserController.getUserProfile);

router.put('/me', AuthMiddleware.authorize, UserController.updateUserProfile);

router.post('/login', UserController.login);

router.post('/register', UserController.registerUser, UserController.login);

export default router;