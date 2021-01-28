import { Router } from "express";
import DoctorsController from "../controllers/doctors";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, DoctorsController.getAllDoctors);

router.get("/me", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, DoctorsController.getDoctorById);

export default router;
