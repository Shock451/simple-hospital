"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");
var _radiology = _interopRequireDefault(require("../controllers/radiology"));
var _multer = _interopRequireDefault(require("multer"));
var _uuid = require("uuid");

var _auth = _interopRequireDefault(require("../middlewares/auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, __dirname + '/../public/scans');
  },
  filename: function filename(req, file, callback) {
    callback(null, (0, _uuid.v4)() + ".png");
  } });


var router = (0, _express.Router)();

router.post('/upload',
_auth.default.authorize,
(0, _multer.default)({
  dest: './public/scans/',
  storage: storage,
  limits: {
    fieldSize: 10 * 1024 * 1024 } }).

single('file'),
_radiology.default.uploadScanReport);


// router.post('/me', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, RadiologyController.postRequestsByToken);

// router.delete('/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, RadiologyController.deleteRequestById);

// router.patch('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, RadiologyController.updateRequestStatus);
var _default =
router;exports.default = _default;