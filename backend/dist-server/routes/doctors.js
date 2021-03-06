"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");
var _doctors = _interopRequireDefault(require("../controllers/doctors"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _express.Router)();

router.get('/', _auth.default.authorize, _doctors.default.getAllDoctors);

router.get("/patients/:id/readings", _auth.default.authorize, _auth.default.only_doctors, _doctors.default.getReadingsByPatientId);

router.get("/me", _auth.default.authorize, _auth.default.only_doctors, _doctors.default.getDoctorById);

router.get('/scans/:id', _auth.default.authorize, _auth.default.only_doctors, _doctors.default.getScanReports);
router.get('/scans/:patient/:report', _auth.default.authorize, _auth.default.only_doctors, _doctors.default.getScanReport);var _default =

router;exports.default = _default;