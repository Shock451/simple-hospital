import { Router } from "express";
import RadiologyController from "../controllers/radiology";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

import AuthMiddlewares from "../middlewares/auth";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../public/scans');
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + ".png");
    }
});

const router = Router();

router.post('/upload',
    AuthMiddlewares.authorize,
    multer({
        dest: './public/scans/',
        storage: storage,
        limits: {
            fieldSize: 10 * 1024 * 1024
        }
    }).single('file'),
    RadiologyController.uploadScanReport
);

// router.post('/me', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, RadiologyController.postRequestsByToken);

// router.delete('/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, RadiologyController.deleteRequestById);

// router.patch('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, RadiologyController.updateRequestStatus);

export default router;
