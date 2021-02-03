import { Router } from "express";

import doctorsRouter from "./doctors";
import patientsRouter from "./patients";
import chatsRouter from "./chats";
import usersRouter from "./users";
import appointmentsRouter from './appointments';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        data: "Welcome to Doctor Patient Portal v1"
    });
});

router.use("/appointments", appointmentsRouter);
router.use("/doctors", doctorsRouter);
router.use("/users", usersRouter);
router.use("/patients", patientsRouter);
router.use("/chats", chatsRouter);

export default router;