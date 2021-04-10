import { Router } from "express";
import PatientController from "../controllers/patients";
import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get("/me", AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getPatientByToken);

router.get("/readings/me", AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getReadingsByPatientId);

router.post("/readings/:id", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, PatientController.postReadingsByPatientId);

router.get("/readings/:id", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, PatientController.getReadingByPatientId);

router.put("/readings/:id", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, PatientController.updateReadingByPatientId);

router.delete("/readings/:id", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, PatientController.deleteReadingsByPatientId);

router.get('/scans', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getScanReports);

router.get('/scans/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getScanReport);

router.get("/:search?", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors_or_radiographers, PatientController.getAllPatients);

router.get("/:id/complete", AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, PatientController.getPatientProfile);


// router.post("/messages/:id", AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getContactList);

// router.get('/readings/me', AuthMiddlewares.authorize, PatientController.getReadings);

// patient_name
// description
// date
// doctor_list

export default router;


