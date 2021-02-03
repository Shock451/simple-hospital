"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _chat = require("../models/chat.js");




var _user = require("../models/user.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =


{

  getContactList: function () {var _getContactList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var user_id, role, contactList;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              user_id = req._id;
              role = req._role;_context.next = 4;return (

                (0, _chat.fetchContactList)(user_id, role));case 4:contactList = _context.sent;

              res.status(200).json({ contactList: contactList });case 6:case "end":return _context.stop();}}}, _callee);}));function getContactList(_x, _x2) {return _getContactList.apply(this, arguments);}return getContactList;}(),


  getMessages: function () {var _getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var user_id, recipient_id, messages, _yield$getUsersById, _yield$getUsersById2, recipientDetails;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              user_id = req._id;
              recipient_id = req.params.recipient_id;_context2.next = 4;return (

                (0, _chat.fetchMessages)(user_id, recipient_id));case 4:messages = _context2.sent;_context2.next = 7;return (
                (0, _user.getUsersById)(recipient_id));case 7:_yield$getUsersById = _context2.sent;_yield$getUsersById2 = _slicedToArray(_yield$getUsersById, 1);recipientDetails = _yield$getUsersById2[0];

              res.status(200).json({
                messages: messages,
                recipientDetails: {
                  name: recipientDetails.name } });case 11:case "end":return _context2.stop();}}}, _callee2);}));function getMessages(_x3, _x4) {return _getMessages.apply(this, arguments);}return getMessages;}(),





  postMessage: function () {var _postMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var from_id, _req$body, message, to_id, sent;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              from_id = req._id;_req$body =
              req.body, message = _req$body.message, to_id = _req$body.to_id;_context3.next = 4;return (

                (0, _chat.sendMessage)({ from_id: from_id, to_id: to_id, message: message }));case 4:sent = _context3.sent;if (

              sent) {_context3.next = 8;break;}
              res.status(500).json({
                err: "An error occured" });return _context3.abrupt("return");case 8:




              res.status(200).json({
                msg: "Message sent successfully" });case 9:case "end":return _context3.stop();}}}, _callee3);}));function postMessage(_x5, _x6) {return _postMessage.apply(this, arguments);}return postMessage;}() };exports.default = _default;