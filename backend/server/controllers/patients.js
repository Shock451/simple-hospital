import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getPatients, getPatient } from "../models/patient.js";

export default {

    getAllPatients: async (req, res) => {

        let patients = await getPatients();

        if (patients.length === 0) {
            res.status(404).json({
                error: "There are no patients available",
            });
            return;
        }

        res.status(200).json(patients);
    },

    getPatientById: async (req, res) => {

        const id = req._id;

        let patient = await getPatient(id);

        if (!patient) {
            res.status(404).json({
                error: "Patient does not exist",
            });
            return;
        }

        res.status(200).json(patient);
    },
}