"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.uploadReport = void 0;var _db = require("../setup/db.js");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var uploadReport = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {var query, response;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            query = "INSERT INTO radiology_scans SET ?";_context.next = 3;return (
              (0, _db.doQueryParams)(query, data));case 3:response = _context.sent;if (!(
            response.affectedRows === 1)) {_context.next = 6;break;}return _context.abrupt("return",
            true);case 6:return _context.abrupt("return",

            false);case 7:case "end":return _context.stop();}}}, _callee);}));return function uploadReport(_x) {return _ref.apply(this, arguments);};}();exports.uploadReport = uploadReport;