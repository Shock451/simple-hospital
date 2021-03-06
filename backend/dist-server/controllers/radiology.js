"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _radiology = require("../models/radiology");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =






{

  uploadScanReport: function () {var _uploadScanReport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var _req$body, patient_id, description, uploaded;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_req$body =
              req.body, patient_id = _req$body.patient_id, description = _req$body.description;if (

              req.file) {_context.next = 3;break;}return _context.abrupt("return",
              res.send({
                success: false }));case 3:_context.next = 5;return (



                (0, _radiology.uploadReport)({
                  patient_id: patient_id,
                  report: description,
                  image_uri: req.file.filename }));case 5:uploaded = _context.sent;if (


              uploaded) {_context.next = 9;break;}
              res.status(500).json({
                err: "An error occured" });return _context.abrupt("return");case 9:




              res.status(200).json({
                msg: "Scan report uploaded successfully" });case 10:case "end":return _context.stop();}}}, _callee);}));function uploadScanReport(_x, _x2) {return _uploadScanReport.apply(this, arguments);}return uploadScanReport;}() };exports.default = _default;