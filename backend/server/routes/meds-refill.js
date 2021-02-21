import { Router } from "express";
import MedsRefillController from "../controllers/meds-refill";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/me', AuthMiddlewares.authorize, MedsRefillController.getRequestByToken);

router.post('/me', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, MedsRefillController.postRequestsByToken);

router.delete('/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, MedsRefillController.deleteRequestById);

router.patch('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, MedsRefillController.updateRequestStatus);

export default router;
