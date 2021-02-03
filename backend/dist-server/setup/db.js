"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.doQueryParams = exports.doQuery = void 0;var _mysql = require("mysql");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _process$env =






process.env,LOCAL_DB_HOST = _process$env.LOCAL_DB_HOST,LOCAL_DB_USER = _process$env.LOCAL_DB_USER,LOCAL_DB_PASS = _process$env.LOCAL_DB_PASS,LOCAL_DB_NAME = _process$env.LOCAL_DB_NAME;

var localConfig = {
  host: LOCAL_DB_HOST,
  user: LOCAL_DB_USER,
  password: LOCAL_DB_PASS,
  database: LOCAL_DB_NAME };


var connection = (0, _mysql.createPool)(localConfig);

var doQuery = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(queryToDo) {var promise;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            promise = new Promise(function (resolve, reject) {
              var query = queryToDo;
              connection.query(query, function (err, result) {
                if (err) throw err;
                resolve(result);
              });
            });return _context.abrupt("return",
            promise.then(function (result) {
              return result;
            }));case 2:case "end":return _context.stop();}}}, _callee);}));return function doQuery(_x) {return _ref.apply(this, arguments);};}();exports.doQuery = doQuery;

var doQueryParams = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(queryToDo, array) {var promise;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            promise = new Promise(function (resolve, reject) {
              var query = queryToDo;
              connection.query(query, array, function (err, result) {
                if (err) throw err;
                resolve(result);
              });
            });return _context2.abrupt("return",
            promise.then(function (result) {
              return result;
            }));case 2:case "end":return _context2.stop();}}}, _callee2);}));return function doQueryParams(_x2, _x3) {return _ref2.apply(this, arguments);};}();exports.doQueryParams = doQueryParams;var _default =


connection;exports.default = _default;