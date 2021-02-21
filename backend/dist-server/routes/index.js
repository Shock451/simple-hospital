"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");

var _doctors = _interopRequireDefault(require("./doctors"));
var _patients = _interopRequireDefault(require("./patients"));
var _chats = _interopRequireDefault(require("./chats"));
var _users = _interopRequireDefault(require("./users"));
var _appointments = _interopRequireDefault(require("./appointments"));
var _medsRefill = _interopRequireDefault(require("./meds-refill"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _express.Router)();

router.get('/', function (req, res) {
  res.status(200).json({
    data: "Welcome to Doctor Patient Portal v1" });

});

router.use("/appointments", _appointments.default);
router.use("/doctors", _doctors.default);
router.use("/users", _users.default);
router.use("/patients", _patients.default);
router.use("/chats", _chats.default);
router.use("/meds-refill", _medsRefill.default);var _default =

router;exports.default = _default;