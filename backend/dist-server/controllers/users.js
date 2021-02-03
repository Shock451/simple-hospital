"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user2 = require("../models/user.js");
var _constants = require("../helpers/constants");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{

  getUserProfile: function () {var _getUserProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var id, role, _yield$getUsersById, _yield$getUsersById2, user, _yield$getProfile, _yield$getProfile2, userDetails;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              id = req._id;
              role = req._role;_context.next = 4;return (

                (0, _user2.getUsersById)(id));case 4:_yield$getUsersById = _context.sent;_yield$getUsersById2 = _slicedToArray(_yield$getUsersById, 1);user = _yield$getUsersById2[0];if (

              user) {_context.next = 10;break;}
              res.status(404).json({
                err: "user does not exist" });return _context.abrupt("return");case 10:_context.next = 12;return (




                (0, _user2.getProfile)(id, role));case 12:_yield$getProfile = _context.sent;_yield$getProfile2 = _slicedToArray(_yield$getProfile, 1);userDetails = _yield$getProfile2[0];if (

              userDetails) {_context.next = 18;break;}
              res.status(404).json({
                err: "profile does not exist" });return _context.abrupt("return");case 18:




              res.status(200).json({
                email: user.email,
                mobile: user.mobile,
                name: user.name,
                role: user.role,
                address: userDetails.address,
                city: userDetails.city,
                state: userDetails.state,
                description: userDetails.description });case 19:case "end":return _context.stop();}}}, _callee);}));function getUserProfile(_x, _x2) {return _getUserProfile.apply(this, arguments);}return getUserProfile;}(),



  updateUserProfile: function () {var _updateUserProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var user_id, role, _req$body, address, description, city, state, email, name, mobile, old_password, password, password2, data, _yield$getUsersByEmai, _yield$getUsersByEmai2, user, hashedPassword, _yield$getUsersById3, _yield$getUsersById4, _user, validPassword, updated;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              user_id = req._id;
              role = req._role;_req$body =
              req.body, address = _req$body.address, description = _req$body.description, city = _req$body.city, state = _req$body.state, email = _req$body.email, name = _req$body.name, mobile = _req$body.mobile, old_password = _req$body.old_password, password = _req$body.password, password2 = _req$body.password2;

              data = {
                address: address,
                description: description,
                city: city,
                state: state,
                email: email,
                name: name,
                mobile: mobile };if (!


              email) {_context2.next = 13;break;}_context2.next = 7;return (
                (0, _user2.getUsersByEmail)(email));case 7:_yield$getUsersByEmai = _context2.sent;_yield$getUsersByEmai2 = _slicedToArray(_yield$getUsersByEmai, 1);user = _yield$getUsersByEmai2[0];if (!(

              user_id !== user.id && user.email === email)) {_context2.next = 13;break;}
              res.status(400).json({
                err: 'Email already taken' });return _context2.abrupt("return");case 13:





              hashedPassword = "";if (!(
              old_password && password && password2)) {_context2.next = 36;break;}if (!(
              password !== password2)) {_context2.next = 18;break;}
              res.status(400).json({
                err: "Passwords do not match" });return _context2.abrupt("return");case 18:_context2.next = 20;return (



                (0, _user2.getUsersById)(user_id));case 20:_yield$getUsersById3 = _context2.sent;_yield$getUsersById4 = _slicedToArray(_yield$getUsersById3, 1);_user = _yield$getUsersById4[0];if (
              _user) {_context2.next = 26;break;}
              res.status(404).json({
                err: "Your account cannot be found" });return _context2.abrupt("return");case 26:_context2.next = 28;return (



                _bcryptjs.default.compare(old_password, _user.password));case 28:validPassword = _context2.sent;if (
              validPassword) {_context2.next = 32;break;}
              res.status(401).json({
                err: "Invalid old password" });return _context2.abrupt("return");case 32:_context2.next = 34;return (



                _bcryptjs.default.hash(password, 10));case 34:hashedPassword = _context2.sent;
              data["password"] = hashedPassword;case 36:_context2.next = 38;return (


                (0, _user2.updateProfile)(user_id, role, data));case 38:updated = _context2.sent;if (

              updated) {_context2.next = 42;break;}
              res.status(500).json({
                err: "An error occured" });return _context2.abrupt("return");case 42:




              res.status(200).json({
                msg: "Profile updated successfully" });case 43:case "end":return _context2.stop();}}}, _callee2);}));function updateUserProfile(_x3, _x4) {return _updateUserProfile.apply(this, arguments);}return updateUserProfile;}(),



  login: function () {var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var _req$body2, email, password, _yield$getUsersByEmai3, _yield$getUsersByEmai4, user, validPassword, token;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_req$body2 =

              req.body, email = _req$body2.email, password = _req$body2.password;_context3.next = 3;return (

                (0, _user2.getUsersByEmail)(email));case 3:_yield$getUsersByEmai3 = _context3.sent;_yield$getUsersByEmai4 = _slicedToArray(_yield$getUsersByEmai3, 1);user = _yield$getUsersByEmai4[0];if (

              user) {_context3.next = 9;break;}
              res.status(401).json({
                err: "User not found." });return _context3.abrupt("return");case 9:_context3.next = 11;return (




                _bcryptjs.default.compare(password, user.password));case 11:validPassword = _context3.sent;if (

              validPassword) {_context3.next = 15;break;}
              res.status(401).json({
                err: "Invalid email or password." });return _context3.abrupt("return");case 15:




              token = _jsonwebtoken.default.sign({
                id: user.id,
                role: user.role },
              process.env.APP_SECRET, {
                expiresIn: "20h" });


              res.status(200).json({
                token: token });return _context3.abrupt("return");case 18:case "end":return _context3.stop();}}}, _callee3);}));function login(_x5, _x6) {return _login.apply(this, arguments);}return login;}(),




  registerUser: function () {var _registerUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {var _req$body3, name, email, mobile, password, role, userExists, hashedPassword, userCreated;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_req$body3 =

              req.body, name = _req$body3.name, email = _req$body3.email, mobile = _req$body3.mobile, password = _req$body3.password, role = _req$body3.role;if (!(

              !email || !mobile || !password || !name || !role)) {_context4.next = 4;break;}
              res.status(400).json({
                err: 'Please provide name/mobile/email/password.' });return _context4.abrupt("return");case 4:if (




              Object.values(_constants.ROLES).includes(role)) {_context4.next = 7;break;}
              res.status(400).json({
                err: 'Invalid user role.' });return _context4.abrupt("return");case 7:_context4.next = 9;return (




                (0, _user2.checkEmail)(email));case 9:userExists = _context4.sent;if (!

              userExists) {_context4.next = 13;break;}
              res.status(400).json({
                err: 'Email already taken' });return _context4.abrupt("return");case 13:_context4.next = 15;return (




                _bcryptjs.default.hash(password, 10));case 15:hashedPassword = _context4.sent;_context4.next = 18;return (

                (0, _user2.createUser)({
                  name: name,
                  email: email,
                  mobile: mobile,
                  password: hashedPassword,
                  role: role }));case 18:userCreated = _context4.sent;


              if (userCreated) {
                next();
              } else {
                res.status(500).json({
                  err: 'An error occured.' });

              }case 20:case "end":return _context4.stop();}}}, _callee4);}));function registerUser(_x7, _x8, _x9) {return _registerUser.apply(this, arguments);}return registerUser;}() };exports.default = _default;