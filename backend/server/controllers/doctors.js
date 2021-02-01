import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getDoctors, getDoctor } from "../models/doctor.js";
import { getUsersById } from './../models/user';

export default {

    getAllDoctors: async (req, res) => {

        let doctors = await getDoctors();

        if (doctors.length === 0) {
            res.status(404).json({
                error: "There are no doctors available",
            });
            return;
        }

        res.status(200).json({
            doctors: doctors,
        });
    },

    getDoctorById: async (req, res) => {

        const id = req._id;

        let doctor = await getDoctor(id);

        if (!doctor) {
            res.status(404).json({
                error: "Doctor does not exist",
            });
            return;
        }

        res.status(200).json(doctor);
    },

    getContactList: async (req, res) => {
        const user_id = req._id;

        let patientList
        patientList = await fetchContactList(user_id);

        res.status(200).json({ patientList });
    },

    getMessages: async (req, res) => {
        const user_id = req._id;
        const recipient_id = req.params.recipient_id;

        const patientChat = await fetchMessages(user_id, recipient_id);
        const [patientDetails] = await getUsersById(recipient_id);

        res.status(200).json({ patientChat, patientDetails });
    }

}