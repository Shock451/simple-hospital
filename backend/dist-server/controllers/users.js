"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user2 = require("../models/user.js");
var _constants = require("../helpers/constants");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{

  getUserProfile: function () {var _getUserProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var id, role, _yield$getUsersById, _yield$getUsersById2, user, _yield$getProfile, _yield$getProfile2, userDetails;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              id = req._id;
              role = req._role;_context.next = 4;return (

                (0, _user2.getUsersById)(id));case 4:_yield$getUsersById = _context.sent;_yield$getUsersById2 = _slicedToArray(_yield$getUsersById, 1);user = _yield$getUsersById2[0];if (!(

              role === _constants.ROLES[3])) {_context.next = 10;break;}
              res.status(200).json({
                email: user.email,
                mobile: user.mobile,
                name: user.name,
                role: user.role });return _context.abrupt("return");case 10:if (




              user) {_context.next = 13;break;}
              res.status(404).json({
                err: "user does not exist" });return _context.abrupt("return");case 13:_context.next = 15;return (




                (0, _user2.getProfile)(id, role));case 15:_yield$getProfile = _context.sent;_yield$getProfile2 = _slicedToArray(_yield$getProfile, 1);userDetails = _yield$getProfile2[0];if (

              userDetails) {_context.next = 21;break;}
              res.status(404).json({
                err: "profile does not exist" });return _context.abrupt("return");case 21:




              res.status(200).json(_objectSpread({
                email: user.email,
                mobile: user.mobile,
                name: user.name,
                role: user.role },
              userDetails));case 22:case "end":return _context.stop();}}}, _callee);}));function getUserProfile(_x, _x2) {return _getUserProfile.apply(this, arguments);}return getUserProfile;}(),



  getStaffList: function () {var _getStaffList2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var staffList;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                (0, _user2.getStaffList)());case 2:staffList = _context2.sent;
              res.status(200).json({ staffList: staffList });return _context2.abrupt("return");case 5:case "end":return _context2.stop();}}}, _callee2);}));function getStaffList(_x3, _x4) {return _getStaffList2.apply(this, arguments);}return getStaffList;}(),



  deleteStaff: function () {var _deleteStaff = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var _req$body, id, role, deletedUser, deletedProfile;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_req$body =
              req.body, id = _req$body.id, role = _req$body.role;_context3.next = 3;return (
                (0, _user2.deleteUser)(id));case 3:deletedUser = _context3.sent;_context3.next = 6;return (
                (0, _user2.deleteProfile)(id, role));case 6:deletedProfile = _context3.sent;if (

              deletedUser && deletedProfile) {_context3.next = 10;break;}
              res.status(500).json({
                err: "An error occured" });return _context3.abrupt("return");case 10:




              res.status(200).json({
                msg: "Staff deleted successfully" });case 11:case "end":return _context3.stop();}}}, _callee3);}));function deleteStaff(_x5, _x6) {return _deleteStaff.apply(this, arguments);}return deleteStaff;}(),



  updateUserProfile: function () {var _updateUserProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {var user_id, role, _req$body2, address, gender, description, city, state, email, name, mobile, old_password, password, password2, data, _yield$getUsersByEmai, _yield$getUsersByEmai2, user, hashedPassword, _yield$getUsersById3, _yield$getUsersById4, _user, validPassword, updated;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              user_id = req._id;
              role = req._role;_req$body2 =

              req.body, address = _req$body2.address, gender = _req$body2.gender, description = _req$body2.description, city = _req$body2.city, state = _req$body2.state, email = _req$body2.email, name = _req$body2.name, mobile = _req$body2.mobile, old_password = _req$body2.old_password, password = _req$body2.password, password2 = _req$body2.password2;

              data = _objectSpread({
                address: address,
                description: description,
                gender: gender,
                city: city,
                state: state,
                email: email,
                name: name,
                mobile: mobile },
              role === _constants.ROLES[0] ?
              {
                allergies: req.body.allergies,
                dob: req.body.dob } :

              {
                license_num: req.body.license_num });if (!



              email) {_context4.next = 13;break;}_context4.next = 7;return (
                (0, _user2.getUsersByEmail)(email));case 7:_yield$getUsersByEmai = _context4.sent;_yield$getUsersByEmai2 = _slicedToArray(_yield$getUsersByEmai, 1);user = _yield$getUsersByEmai2[0];if (!(

              user_id !== user.id && user.email === email)) {_context4.next = 13;break;}
              res.status(400).json({
                err: 'Email already taken' });return _context4.abrupt("return");case 13:





              hashedPassword = "";if (!(
              old_password && password && password2)) {_context4.next = 36;break;}if (!(
              password !== password2)) {_context4.next = 18;break;}
              res.status(400).json({
                err: "Passwords do not match" });return _context4.abrupt("return");case 18:_context4.next = 20;return (



                (0, _user2.getUsersById)(user_id));case 20:_yield$getUsersById3 = _context4.sent;_yield$getUsersById4 = _slicedToArray(_yield$getUsersById3, 1);_user = _yield$getUsersById4[0];if (
              _user) {_context4.next = 26;break;}
              res.status(404).json({
                err: "Your account cannot be found" });return _context4.abrupt("return");case 26:_context4.next = 28;return (



                _bcryptjs.default.compare(old_password, _user.password));case 28:validPassword = _context4.sent;if (
              validPassword) {_context4.next = 32;break;}
              res.status(401).json({
                err: "Invalid old password" });return _context4.abrupt("return");case 32:_context4.next = 34;return (



                _bcryptjs.default.hash(password, 10));case 34:hashedPassword = _context4.sent;
              data["password"] = hashedPassword;case 36:_context4.next = 38;return (


                (0, _user2.updateProfile)(user_id, role, data));case 38:updated = _context4.sent;if (

              updated) {_context4.next = 42;break;}
              res.status(500).json({
                err: "An error occured" });return _context4.abrupt("return");case 42:




              res.status(200).json({
                msg: "Profile updated successfully" });case 43:case "end":return _context4.stop();}}}, _callee4);}));function updateUserProfile(_x7, _x8) {return _updateUserProfile.apply(this, arguments);}return updateUserProfile;}(),



  login: function () {var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {var _req$body3, email, password, _yield$getUsersByEmai3, _yield$getUsersByEmai4, user, validPassword, token;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_req$body3 =

              req.body, email = _req$body3.email, password = _req$body3.password;_context5.next = 3;return (

                (0, _user2.getUsersByEmail)(email));case 3:_yield$getUsersByEmai3 = _context5.sent;_yield$getUsersByEmai4 = _slicedToArray(_yield$getUsersByEmai3, 1);user = _yield$getUsersByEmai4[0];if (

              user) {_context5.next = 9;break;}
              res.status(401).json({
                err: "User not found." });return _context5.abrupt("return");case 9:




              validPassword = true;if (!(
              user.role !== _constants.ROLES[3])) {_context5.next = 14;break;}_context5.next = 13;return (
                _bcryptjs.default.compare(password, user.password));case 13:validPassword = _context5.sent;case 14:
              ;if (

              validPassword) {_context5.next = 18;break;}
              res.status(401).json({
                err: "Invalid email or password." });return _context5.abrupt("return");case 18:




              token = _jsonwebtoken.default.sign({
                id: user.id,
                role: user.role },
              process.env.APP_SECRET, {
                expiresIn: "20h" });


              res.status(200).json({ token: token });return _context5.abrupt("return");case 21:case "end":return _context5.stop();}}}, _callee5);}));function login(_x9, _x10) {return _login.apply(this, arguments);}return login;}(),



  registerUser: function () {var _registerUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {var _req$body4, name, email, mobile, password, role, userExists, hashedPassword, userCreated;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_req$body4 =

              req.body, name = _req$body4.name, email = _req$body4.email, mobile = _req$body4.mobile, password = _req$body4.password, role = _req$body4.role;if (!(

              !email || !mobile || !password || !name || !role)) {_context6.next = 4;break;}
              res.status(400).json({
                err: 'Please provide name/mobile/email/password.' });return _context6.abrupt("return");case 4:if (




              Object.values(_constants.ROLES).includes(role)) {_context6.next = 7;break;}
              res.status(400).json({
                err: 'Invalid user role.' });return _context6.abrupt("return");case 7:_context6.next = 9;return (




                (0, _user2.checkEmail)(email));case 9:userExists = _context6.sent;if (!

              userExists) {_context6.next = 13;break;}
              res.status(400).json({
                err: 'Email already taken' });return _context6.abrupt("return");case 13:_context6.next = 15;return (




                _bcryptjs.default.hash(password, 10));case 15:hashedPassword = _context6.sent;_context6.next = 18;return (

                (0, _user2.createUser)({
                  name: name,
                  email: email,
                  mobile: mobile,
                  password: hashedPassword,
                  role: role }));case 18:userCreated = _context6.sent;


              if (userCreated) {
                next();
              } else {
                res.status(500).json({
                  err: 'An error occured.' });

              }case 20:case "end":return _context6.stop();}}}, _callee6);}));function registerUser(_x11, _x12, _x13) {return _registerUser.apply(this, arguments);}return registerUser;}() };exports.default = _default;