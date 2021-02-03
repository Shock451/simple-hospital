"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteReadingsById = exports.updateReadingsById = exports.addReadingsById = exports.getReadingByPatient = exports.getReadingsByPatient = exports.getPatientProfile = exports.getPatient = exports.getPatients = void 0;var _db = require("../setup/db.js");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var getPatients = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(search) {var condition, query;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            condition = "";
            if (search) {
              condition = "AND (name like '%".concat(search, "%' OR email like '%").concat(search, "%' or mobile like '%").concat(search, "%')");
            }
            query = "SELECT * FROM users WHERE role = 'patient' ".concat(condition);return _context.abrupt("return",
            (0, _db.doQueryParams)(query));case 4:case "end":return _context.stop();}}}, _callee);}));return function getPatients(_x) {return _ref.apply(this, arguments);};}();exports.getPatients = getPatients;


var getPatient = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {var query;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            query = "SELECT * FROM users WHERE id = ? AND role = 'patient'";return _context2.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 2:case "end":return _context2.stop();}}}, _callee2);}));return function getPatient(_x2) {return _ref2.apply(this, arguments);};}();exports.getPatient = getPatient;


var getPatientProfile = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {var query;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            query = "SELECT * FROM patients WHERE user_id = ?";return _context3.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 2:case "end":return _context3.stop();}}}, _callee3);}));return function getPatientProfile(_x3) {return _ref3.apply(this, arguments);};}();exports.getPatientProfile = getPatientProfile;


var getReadingsByPatient = function getReadingsByPatient(id) {var days = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
  var query = "SELECT * FROM patient_readings WHERE patient_id = ? AND created >= CURDATE() - INTERVAL ".concat(days, " DAY");
  return (0, _db.doQueryParams)(query, [id]);
};exports.getReadingsByPatient = getReadingsByPatient;

var getReadingByPatient = function getReadingByPatient(id, patient_id) {
  var query = "SELECT * FROM patient_readings WHERE patient_id = ? AND id = ?";
  return (0, _db.doQueryParams)(query, [patient_id, id]);
};exports.getReadingByPatient = getReadingByPatient;

var addReadingsById = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {var query, response;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            query = "INSERT INTO patient_readings set ?";_context4.next = 3;return (
              (0, _db.doQueryParams)(query, [data]));case 3:response = _context4.sent;if (!(
            response.affectedRows === 1)) {_context4.next = 6;break;}return _context4.abrupt("return",
            true);case 6:return _context4.abrupt("return",

            false);case 7:case "end":return _context4.stop();}}}, _callee4);}));return function addReadingsById(_x4) {return _ref4.apply(this, arguments);};}();exports.addReadingsById = addReadingsById;


var updateReadingsById = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(reading_id, user_id, data) {var query, response;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
            query = "UPDATE patient_readings SET ? WHERE patient_id = ? AND id = ?";_context5.next = 3;return (
              (0, _db.doQueryParams)(query, [data, user_id, reading_id]));case 3:response = _context5.sent;if (!(
            response.affectedRows === 1)) {_context5.next = 6;break;}return _context5.abrupt("return",
            true);case 6:return _context5.abrupt("return",

            false);case 7:case "end":return _context5.stop();}}}, _callee5);}));return function updateReadingsById(_x5, _x6, _x7) {return _ref5.apply(this, arguments);};}();exports.updateReadingsById = updateReadingsById;


var deleteReadingsById = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user_id, reading_id) {var query, response;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
            query = "DELETE FROM patient_readings WHERE patient_id = ? AND id = ?";_context6.next = 3;return (
              (0, _db.doQueryParams)(query, [user_id, reading_id]));case 3:response = _context6.sent;if (!(
            response.affectedRows === 1)) {_context6.next = 6;break;}return _context6.abrupt("return",
            true);case 6:return _context6.abrupt("return",

            false);case 7:case "end":return _context6.stop();}}}, _callee6);}));return function deleteReadingsById(_x8, _x9) {return _ref6.apply(this, arguments);};}();exports.deleteReadingsById = deleteReadingsById;