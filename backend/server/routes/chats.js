import { Router } from "express";
import ProviderController from "../controllers/chat";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/flat-rates', AuthMiddlewares.authorize, ProviderController.getFlatRates);

router.post('/flat-rates', AuthMiddlewares.authorize, ProviderController.createFlatRate);

router.delete('/flat-rates/:id', AuthMiddlewares.authorize, ProviderController.deleteFlatRate);

router.put('/flat-rates', AuthMiddlewares.authorize, ProviderController.updateFlatRate);

router.get('/me', AuthMiddlewares.authorize, ProviderController.getProfile);

router.patch('/me', AuthMiddlewares.authorize, ProviderController.updateProfile);

router.patch('/manager', AuthMiddlewares.authorize, ProviderController.updateManagerProfile);

export default router;

