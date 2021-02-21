"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = require("../helpers/constants");
var _medsRefill = require("../models/meds-refill");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =






{

  getRequestByToken: function () {var _getRequestByToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var id, role, appointments;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

              id = req._id;
              role = req._role;_context.next = 4;return (

                (0, _medsRefill.fetchRequestsById)(id, role));case 4:appointments = _context.sent;

              res.status(200).json({
                appointments: appointments });case 6:case "end":return _context.stop();}}}, _callee);}));function getRequestByToken(_x, _x2) {return _getRequestByToken.apply(this, arguments);}return getRequestByToken;}(),



  postRequestsByToken: function () {var _postRequestsByToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var patient_id, _req$body, doctor_id, date, description, created;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              patient_id = req._id;_req$body =
              req.body, doctor_id = _req$body.doctor_id, date = _req$body.date, description = _req$body.description;if (!(

              !doctor_id || !date || !description)) {_context2.next = 5;break;}
              res.status(400).json({
                err: "Required: doctor_id, description" });return _context2.abrupt("return");case 5:_context2.next = 7;return (




                (0, _medsRefill.createRequest)({
                  patient_id: patient_id,
                  doctor_id: doctor_id,
                  date: date,
                  description: description }));case 7:created = _context2.sent;if (


              created) {_context2.next = 11;break;}
              res.status(500).json({
                err: "An error occured" });return _context2.abrupt("return");case 11:




              res.status(200).json({
                msg: "Request created successfully" });case 12:case "end":return _context2.stop();}}}, _callee2);}));function postRequestsByToken(_x3, _x4) {return _postRequestsByToken.apply(this, arguments);}return postRequestsByToken;}(),



  updateRequestStatus: function () {var _updateRequestStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var doctor_id, _req$body2, id, status, updated;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              doctor_id = req._id;_req$body2 =
              req.body, id = _req$body2.id, status = _req$body2.status;if (

              _constants.APPOINTMENT_STATES.includes(status)) {_context3.next = 5;break;}
              res.status(400).json({
                err: "".concat(status, " is not a valid request status") });return _context3.abrupt("return");case 5:_context3.next = 7;return (




                (0, _medsRefill.updateRequest)(doctor_id, id, status));case 7:updated = _context3.sent;if (

              updated) {_context3.next = 11;break;}
              res.status(500).json({
                err: "An error occured" });return _context3.abrupt("return");case 11:




              res.status(200).json({
                msg: "Status updated successfully" });case 12:case "end":return _context3.stop();}}}, _callee3);}));function updateRequestStatus(_x5, _x6) {return _updateRequestStatus.apply(this, arguments);}return updateRequestStatus;}(),



  deleteRequestById: function () {var _deleteRequestById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {var patient_id, id, deleted;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              patient_id = req._id;
              id = req.params.id;_context4.next = 4;return (

                (0, _medsRefill.deleteRequest)(patient_id, id));case 4:deleted = _context4.sent;if (

              deleted) {_context4.next = 8;break;}
              res.status(500).json({
                err: "An error occured" });return _context4.abrupt("return");case 8:




              res.status(200).json({
                msg: "Request deleted successfully" });case 9:case "end":return _context4.stop();}}}, _callee4);}));function deleteRequestById(_x7, _x8) {return _deleteRequestById.apply(this, arguments);}return deleteRequestById;}() };exports.default = _default;