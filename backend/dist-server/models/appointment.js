"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.fetchAppointmentsById = void 0;var _constants = require("../helpers/constants.js");
var _db = require("../setup/db.js");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var fetchAppointmentsById = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, role) {var inverted_role, query;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            inverted_role = _constants.ROLES[0];
            if (role === _constants.ROLES[0]) {
              inverted_role = _constants.ROLES[1];
            }
            query = "SELECT appointments.*, users.name FROM appointments, users \n    WHERE appointments.".concat(
            role, "_id = ? AND appointments.").concat(inverted_role, "_id = users.id ");return _context.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 4:case "end":return _context.stop();}}}, _callee);}));return function fetchAppointmentsById(_x, _x2) {return _ref.apply(this, arguments);};}();exports.fetchAppointmentsById = fetchAppointmentsById;



var createAppointment = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {var query, response;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            query = "INSERT INTO appointments SET ?";_context2.next = 3;return (
              (0, _db.doQueryParams)(query, data));case 3:response = _context2.sent;if (!(
            response.affectedRows === 1)) {_context2.next = 6;break;}return _context2.abrupt("return",
            true);case 6:return _context2.abrupt("return",

            false);case 7:case "end":return _context2.stop();}}}, _callee2);}));return function createAppointment(_x3) {return _ref2.apply(this, arguments);};}();exports.createAppointment = createAppointment;


var updateAppointment = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(doctor_id, id, status) {var query, response;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            query = "UPDATE appointments SET status = ? WHERE doctor_id = ? AND id = ?";_context3.next = 3;return (
              (0, _db.doQueryParams)(query, [status, doctor_id, id]));case 3:response = _context3.sent;if (!(
            response.affectedRows === 1)) {_context3.next = 6;break;}return _context3.abrupt("return",
            true);case 6:return _context3.abrupt("return",

            false);case 7:case "end":return _context3.stop();}}}, _callee3);}));return function updateAppointment(_x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();exports.updateAppointment = updateAppointment;


var deleteAppointment = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(patient_id, id) {var query, response;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            query = "DELETE FROM appointments WHERE patient_id = ? AND id = ?";_context4.next = 3;return (
              (0, _db.doQueryParams)(query, [patient_id, id]));case 3:response = _context4.sent;if (!(
            response.affectedRows === 1)) {_context4.next = 6;break;}return _context4.abrupt("return",
            true);case 6:return _context4.abrupt("return",

            false);case 7:case "end":return _context4.stop();}}}, _callee4);}));return function deleteAppointment(_x7, _x8) {return _ref4.apply(this, arguments);};}();exports.deleteAppointment = deleteAppointment;