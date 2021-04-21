"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _patient = require("../models/patient.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =














{

  getAllPatients: function () {var _getAllPatients = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var search, patients;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

              search = req.query.search;_context.next = 3;return (

                (0, _patient.getPatients)(search));case 3:patients = _context.sent;if (!(

              patients.length === 0)) {_context.next = 7;break;}
              res.status(404).json({
                err: "There are no patients available" });return _context.abrupt("return");case 7:




              res.status(200).json(patients);case 8:case "end":return _context.stop();}}}, _callee);}));function getAllPatients(_x, _x2) {return _getAllPatients.apply(this, arguments);}return getAllPatients;}(),


  getPatientByToken: function () {var _getPatientByToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var id, patient;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

              id = req._id;_context2.next = 3;return (

                (0, _patient.getPatientProfile)(id));case 3:patient = _context2.sent;if (

              patient) {_context2.next = 7;break;}
              res.status(404).json({
                err: "Patient does not exist" });return _context2.abrupt("return");case 7:




              res.status(200).json(patient);case 8:case "end":return _context2.stop();}}}, _callee2);}));function getPatientByToken(_x3, _x4) {return _getPatientByToken.apply(this, arguments);}return getPatientByToken;}(),


  getPatientProfile: function () {var _getPatientProfile2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var id, _yield$getPatient, _yield$getPatient2, user, _yield$_getPatientPro, _yield$_getPatientPro2, patient, readings;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

              id = req.params.id;_context3.next = 3;return (

                (0, _patient.getPatient)(id));case 3:_yield$getPatient = _context3.sent;_yield$getPatient2 = _slicedToArray(_yield$getPatient, 1);user = _yield$getPatient2[0];_context3.next = 8;return (
                (0, _patient.getPatientProfile)(id));case 8:_yield$_getPatientPro = _context3.sent;_yield$_getPatientPro2 = _slicedToArray(_yield$_getPatientPro, 1);patient = _yield$_getPatientPro2[0];_context3.next = 13;return (
                (0, _patient.getReadingsByPatient)(id));case 13:readings = _context3.sent;if (

              user) {_context3.next = 17;break;}
              res.status(404).json({
                err: "Patient does not exist" });return _context3.abrupt("return");case 17:




              res.status(200).json({
                user: user,
                patient: patient,
                readings: readings });case 18:case "end":return _context3.stop();}}}, _callee3);}));function getPatientProfile(_x5, _x6) {return _getPatientProfile2.apply(this, arguments);}return getPatientProfile;}(),



  getReadingsByPatientId: function () {var _getReadingsByPatientId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {var id, patient;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              id = req._id;_context4.next = 3;return (

                (0, _patient.getReadingsByPatient)(id));case 3:patient = _context4.sent;if (

              patient) {_context4.next = 7;break;}
              res.status(404).json({
                err: "No readings found" });return _context4.abrupt("return");case 7:




              res.status(200).json(patient);case 8:case "end":return _context4.stop();}}}, _callee4);}));function getReadingsByPatientId(_x7, _x8) {return _getReadingsByPatientId.apply(this, arguments);}return getReadingsByPatientId;}(),


  getScanReports: function () {var _getScanReports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {var id, reports;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
              id = req._id;_context5.next = 3;return (
                (0, _patient.getPatientScanReports)(id));case 3:reports = _context5.sent;if (

              reports) {_context5.next = 7;break;}
              res.status(404).json({
                err: "No reports found" });return _context5.abrupt("return");case 7:




              reports = reports.map(function (report) {
                report['image_uri'] = "".concat(req.protocol, "://").concat(req.get('host'), "/static/scans/").concat(report['image_uri']);
                return report;
              });

              res.status(200).json(reports);case 9:case "end":return _context5.stop();}}}, _callee5);}));function getScanReports(_x9, _x10) {return _getScanReports.apply(this, arguments);}return getScanReports;}(),


  getScanReport: function () {var _getScanReport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {var patient_id, report_id, _yield$getPatientScan, _yield$getPatientScan2, report;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
              patient_id = req._id;
              report_id = req.params.id;_context6.next = 4;return (
                (0, _patient.getPatientScanReport)(report_id, patient_id));case 4:_yield$getPatientScan = _context6.sent;_yield$getPatientScan2 = _slicedToArray(_yield$getPatientScan, 1);report = _yield$getPatientScan2[0];if (

              report) {_context6.next = 10;break;}
              res.status(404).json({
                err: "Report not found" });return _context6.abrupt("return");case 10:




              report['image_uri'] = "".concat(req.protocol, "://").concat(req.get('host'), "/static/scans/").concat(report['image_uri']);

              res.status(200).json(report);case 12:case "end":return _context6.stop();}}}, _callee6);}));function getScanReport(_x11, _x12) {return _getScanReport.apply(this, arguments);}return getScanReport;}(),


  getReadingByPatientId: function () {var _getReadingByPatientId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {var id, _yield$getReadingByPa, _yield$getReadingByPa2, record;return regeneratorRuntime.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:

              id = req.params.id;_context7.next = 3;return (

                (0, _patient.getReadingByPatient)(id));case 3:_yield$getReadingByPa = _context7.sent;_yield$getReadingByPa2 = _slicedToArray(_yield$getReadingByPa, 1);record = _yield$getReadingByPa2[0];if (

              record) {_context7.next = 9;break;}
              res.status(404).json({
                err: "Not found" });return _context7.abrupt("return");case 9:




              res.status(200).json(record);case 10:case "end":return _context7.stop();}}}, _callee7);}));function getReadingByPatientId(_x13, _x14) {return _getReadingByPatientId.apply(this, arguments);}return getReadingByPatientId;}(),


  postReadingsByPatientId: function () {var _postReadingsByPatientId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {var user_id, added;return regeneratorRuntime.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:
              user_id = req.params.id;
              // const { blood_pressure, blood_sugar, heart_rate, temperature } = req.body;

              // let added = await addReadingsById({
              //     patient_id: user_id,
              //     blood_pressure,
              //     blood_sugar,
              //     heart_rate,
              //     temperature,
              //     height,
              //     weight,
              //     prescribed
              // });
              _context8.next = 3;return (
                (0, _patient.addReadingsById)(_objectSpread(_objectSpread({}, req.body), {}, { patient_id: user_id })));case 3:added = _context8.sent;if (

              added) {_context8.next = 7;break;}
              res.status(500).json({
                err: "An error occured" });return _context8.abrupt("return");case 7:




              res.status(200).json({
                msg: "Record added successfully" });case 8:case "end":return _context8.stop();}}}, _callee8);}));function postReadingsByPatientId(_x15, _x16) {return _postReadingsByPatientId.apply(this, arguments);}return postReadingsByPatientId;}(),



  updateReadingByPatientId: function () {var _updateReadingByPatientId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {var id, _req$body, blood_pressure, blood_sugar, heart_rate, temperature, height, weight, prescribed, prescription, updated;return regeneratorRuntime.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:
              id = req.params.id;_req$body =
              req.body, blood_pressure = _req$body.blood_pressure, blood_sugar = _req$body.blood_sugar, heart_rate = _req$body.heart_rate, temperature = _req$body.temperature, height = _req$body.height, weight = _req$body.weight, prescribed = _req$body.prescribed, prescription = _req$body.prescription;_context9.next = 4;return (

                (0, _patient.updateReadingsById)(id, {
                  blood_pressure: blood_pressure,
                  blood_sugar: blood_sugar,
                  heart_rate: heart_rate,
                  temperature: temperature,
                  height: height,
                  weight: weight,
                  prescribed: prescribed,
                  prescription: prescription }));case 4:updated = _context9.sent;if (


              updated) {_context9.next = 8;break;}
              res.status(500).json({
                err: "An error occured" });return _context9.abrupt("return");case 8:




              res.status(200).json({
                msg: "Record updated successfully" });case 9:case "end":return _context9.stop();}}}, _callee9);}));function updateReadingByPatientId(_x17, _x18) {return _updateReadingByPatientId.apply(this, arguments);}return updateReadingByPatientId;}(),



  deleteReadingsByPatientId: function () {var _deleteReadingsByPatientId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {var reading_id, deleted;return regeneratorRuntime.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:
              reading_id = req.params.id;_context10.next = 3;return (

                (0, _patient.deleteReadingsById)(reading_id));case 3:deleted = _context10.sent;if (

              deleted) {_context10.next = 7;break;}
              res.status(500).json({
                err: "An error occured" });return _context10.abrupt("return");case 7:




              res.status(200).json({
                msg: "Record deleted successfully" });case 8:case "end":return _context10.stop();}}}, _callee10);}));function deleteReadingsByPatientId(_x19, _x20) {return _deleteReadingsByPatientId.apply(this, arguments);}return deleteReadingsByPatientId;}() };exports.default = _default;