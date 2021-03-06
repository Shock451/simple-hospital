import { Router } from "express";
import DoctorsController from "../controllers/doctors";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/', AuthMiddlewares.authorize, DoctorsController.getAllDoctors);

router.get("/patients/:id/readings", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, DoctorsController.getReadingsByPatientId);

router.get("/me", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, DoctorsController.getDoctorById);

router.get('/scans/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, DoctorsController.getScanReports);
router.get('/scans/:patient/:report', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, DoctorsController.getScanReport);

export default router;
