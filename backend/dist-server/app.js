"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}require("dotenv/config");
require("regenerator-runtime/runtime.js");
var _express = _interopRequireWildcard(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _multer = _interopRequireDefault(require("multer"));

var _index = _interopRequireDefault(require("./routes/index"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var

PORT = process.env.PORT;

var app = (0, _express.default)();

var multerMid = (0, _multer.default)({
  storage: _multer.default.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 } });



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// make the application use cors
app.use((0, _cors.default)());
// use multer for single file uploads
app.use(multerMid.single('file'));

// use bodyparser to parse json body
app.use((0, _express.json)());

// idk bro
app.use((0, _express.urlencoded)({ extended: false }));

/// for errs
app.use(function (err, req, res, next) {
  res.status(500).json({
    err: err,
    msg: 'Internal server error!',
    status: 500 });

  next();
});

app.use("/", _index.default);

app.listen(PORT, function () {return console.log("Now listening on port ".concat(PORT));});