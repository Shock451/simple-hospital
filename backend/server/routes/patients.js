import { Router } from "express";
import PatientController from "../controllers/patients";
import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get("/", AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getAllPatients);

router.get("/me", AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getPatientById);

// router.get('/readings/me', AuthMiddlewares.authorize, PatientController.getReadings);

export default router;


