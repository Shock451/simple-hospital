"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");
var _chat = _interopRequireDefault(require("../controllers/chat"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _express.Router)();

router.get("/:recipient_id", _auth.default.authorize, _chat.default.getMessages);

router.get("/", _auth.default.authorize, _chat.default.getContactList);

router.post("/", _auth.default.authorize, _chat.default.postMessage);var _default =

router;exports.default = _default;