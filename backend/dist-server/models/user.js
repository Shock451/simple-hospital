"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateProfile = exports.createUser = exports.getUsersById = exports.getUsersByEmail = exports.checkEmail = exports.getProfile = exports.deleteProfile = exports.deleteUser = exports.getStaffList = void 0;var _db = require("../setup/db.js");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var getStaffList = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var query;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            query = "SELECT * FROM users WHERE role = 'doctor' or role = 'radiographer'";return _context.abrupt("return",
            (0, _db.doQueryParams)(query));case 2:case "end":return _context.stop();}}}, _callee);}));return function getStaffList() {return _ref.apply(this, arguments);};}();exports.getStaffList = getStaffList;


var deleteUser = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {var query;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            query = "DELETE FROM users WHERE id = ?";return _context2.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 2:case "end":return _context2.stop();}}}, _callee2);}));return function deleteUser(_x) {return _ref2.apply(this, arguments);};}();exports.deleteUser = deleteUser;


var deleteProfile = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, role) {var query;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            query = " DELETE FROM ".concat(role, "s WHERE user_id = ?");return _context3.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 2:case "end":return _context3.stop();}}}, _callee3);}));return function deleteProfile(_x2, _x3) {return _ref3.apply(this, arguments);};}();exports.deleteProfile = deleteProfile;


var getProfile = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, role) {var query;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            // let roleSpecificFields = role === ROLES[0] ? 'dob, alergies'  : 'license_num';
            // let query = `SELECT address, city, state, description, gender, ${roleSpecificFields} FROM ${role}s WHERE user_id = ?`;
            query = "SELECT * FROM ".concat(role, "s WHERE user_id = ?");return _context4.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 2:case "end":return _context4.stop();}}}, _callee4);}));return function getProfile(_x4, _x5) {return _ref4.apply(this, arguments);};}();exports.getProfile = getProfile;


var checkEmail = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(email) {var users;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              getUsersByEmail(email));case 2:users = _context5.sent;if (!(
            users.length > 0)) {_context5.next = 5;break;}return _context5.abrupt("return",
            true);case 5:return _context5.abrupt("return",

            false);case 6:case "end":return _context5.stop();}}}, _callee5);}));return function checkEmail(_x6) {return _ref5.apply(this, arguments);};}();exports.checkEmail = checkEmail;


var getUsersByEmail = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email) {var query;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
            query = "Select * from users where email = ?";return _context6.abrupt("return",
            (0, _db.doQueryParams)(query, [email]));case 2:case "end":return _context6.stop();}}}, _callee6);}));return function getUsersByEmail(_x7) {return _ref6.apply(this, arguments);};}();exports.getUsersByEmail = getUsersByEmail;


var getUsersById = /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {var query;return regeneratorRuntime.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
            query = "Select * from users where id = ?";return _context7.abrupt("return",
            (0, _db.doQueryParams)(query, [id]));case 2:case "end":return _context7.stop();}}}, _callee7);}));return function getUsersById(_x8) {return _ref7.apply(this, arguments);};}();exports.getUsersById = getUsersById;


var createUser = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user) {var query, response;return regeneratorRuntime.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:
            query = "INSERT INTO users set ?";_context8.next = 3;return (
              (0, _db.doQueryParams)(query, [user]));case 3:response = _context8.sent;if (!(
            response.affectedRows === 1)) {_context8.next = 6;break;}return _context8.abrupt("return",
            true);case 6:return _context8.abrupt("return",

            false);case 7:case "end":return _context8.stop();}}}, _callee8);}));return function createUser(_x9) {return _ref8.apply(this, arguments);};}();exports.createUser = createUser;


var updateProfile = /*#__PURE__*/function () {var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id, role, data) {var query, response;return regeneratorRuntime.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:

            query = "UPDATE users, ".concat(role, "s \n        SET ?\n        WHERE users.id = ").concat(

            role, "s.user_id AND users.id = ").concat(id, "\n    ");_context9.next = 3;return (

              (0, _db.doQueryParams)(query, data));case 3:response = _context9.sent;if (!(
            response.affectedRows === 2)) {_context9.next = 6;break;}return _context9.abrupt("return",
            true);case 6:return _context9.abrupt("return",

            false);case 7:case "end":return _context9.stop();}}}, _callee9);}));return function updateProfile(_x10, _x11, _x12) {return _ref9.apply(this, arguments);};}();exports.updateProfile = updateProfile;