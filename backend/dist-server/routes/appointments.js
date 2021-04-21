"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");
var _appointments = _interopRequireDefault(require("../controllers/appointments"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _express.Router)();

router.get('/me', _auth.default.authorize, _appointments.default.getAppointmentsByToken);

router.post('/me', _auth.default.authorize, _auth.default.only_patients, _appointments.default.postAppointmentsByToken);

router.delete('/:id', _auth.default.authorize, _auth.default.only_patients, _appointments.default.deleteAppointmentById);

router.patch('/', _auth.default.authorize, _auth.default.only_doctors, _appointments.default.updateAppointmentStatus);var _default =

router;exports.default = _default;