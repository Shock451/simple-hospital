import { Router } from "express";
import AppointmentsController from "../controllers/appointments";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/me', AuthMiddlewares.authorize, AppointmentsController.getAppointmentsByToken);

router.post('/me', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, AppointmentsController.postAppointmentsByToken);

router.delete('/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, AppointmentsController.deleteAppointmentById);

router.patch('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, AppointmentsController.updateAppointmentStatus);

export default router;
