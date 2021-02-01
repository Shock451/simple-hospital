import { Router } from "express";
import ChatController from "../controllers/chat";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get("/:recipient_id", AuthMiddlewares.authorize, ChatController.getMessages);

router.get("/", AuthMiddlewares.authorize, ChatController.getContactList);

router.post("/", AuthMiddlewares.authorize, ChatController.postMessage);

export default router;

