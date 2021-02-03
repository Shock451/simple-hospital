"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.sendMessage = exports.fetchMessages = exports.fetchContactList = void 0;var _db = require("../setup/db.js");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var fetchContactList = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user_id, role) {var role_inverse, query;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            role_inverse = role === "patient" ? "doctor" : "patient";

            query = "\n    SELECT * FROM\n        (\n            SELECT to_id AS user_id FROM chat WHERE from_id = ".concat(


            user_id, " \n            UNION \n            SELECT from_id from chat WHERE to_id = ").concat(

            user_id, "\n        ) t1 \n    INNER JOIN \n        (\n            SELECT id, name, email FROM users WHERE role = '").concat(



            role_inverse, "'\n        ) t2\n    ON  t1.user_id = t2.id\n    ");return _context.abrupt("return",



            (0, _db.doQueryParams)(query));case 3:case "end":return _context.stop();}}}, _callee);}));return function fetchContactList(_x, _x2) {return _ref.apply(this, arguments);};}();exports.fetchContactList = fetchContactList;


var fetchMessages = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user_id, recipient_id) {var query;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            query = "\n        SELECT * FROM chat WHERE \n        (from_id = ".concat(

            user_id, " AND to_id = ").concat(recipient_id, ")\n        OR\n        (from_id = ").concat(

            recipient_id, " AND to_id = ").concat(user_id, ") \n    ");return _context2.abrupt("return",

            (0, _db.doQueryParams)(query));case 2:case "end":return _context2.stop();}}}, _callee2);}));return function fetchMessages(_x3, _x4) {return _ref2.apply(this, arguments);};}();exports.fetchMessages = fetchMessages;


var sendMessage = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(message) {var query, response;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            query = "INSERT INTO chat SET ?";_context3.next = 3;return (
              (0, _db.doQueryParams)(query, [message]));case 3:response = _context3.sent;if (!(
            response.affectedRows === 1)) {_context3.next = 6;break;}return _context3.abrupt("return",
            true);case 6:return _context3.abrupt("return",

            false);case 7:case "end":return _context3.stop();}}}, _callee3);}));return function sendMessage(_x5) {return _ref3.apply(this, arguments);};}();exports.sendMessage = sendMessage;