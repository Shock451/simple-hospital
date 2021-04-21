"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");
var _patients = _interopRequireDefault(require("../controllers/patients"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _express.Router)();

router.get("/me", _auth.default.authorize, _auth.default.only_patients, _patients.default.getPatientByToken);

router.get("/readings/me", _auth.default.authorize, _auth.default.only_patients, _patients.default.getReadingsByPatientId);

router.post("/readings/:id", _auth.default.authorize, _auth.default.only_doctors, _patients.default.postReadingsByPatientId);

router.get("/readings/:id", _auth.default.authorize, _auth.default.only_doctors, _patients.default.getReadingByPatientId);

router.put("/readings/:id", _auth.default.authorize, _auth.default.only_doctors, _patients.default.updateReadingByPatientId);

router.delete("/readings/:id", _auth.default.authorize, _auth.default.only_doctors, _patients.default.deleteReadingsByPatientId);

router.get('/scans', _auth.default.authorize, _auth.default.only_patients, _patients.default.getScanReports);

router.get('/scans/:id', _auth.default.authorize, _auth.default.only_patients, _patients.default.getScanReport);

router.get("/:search?", _auth.default.authorize, _auth.default.only_doctors_or_radiographers, _patients.default.getAllPatients);

router.get("/:id/complete", _auth.default.authorize, _auth.default.only_doctors, _patients.default.getPatientProfile);


// router.post("/messages/:id", AuthMiddlewares.authorize, AuthMiddlewares.only_patients, PatientController.getContactList);

// router.get('/readings/me', AuthMiddlewares.authorize, PatientController.getReadings);

// patient_name
// description
// date
// doctor_list
var _default =
router;exports.default = _default;