import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getDoctors, getDoctor } from "../models/doctor.js";
import { getUsersById } from './../models/user';
import {
    getReadingsByPatient,
    getPatientScanReport,
    getPatientScanReports,
} from '../models/patient';

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
    },

    getReadingsByPatientId: async (req, res) => {
        const id = req.params.id;

        let patient = await getReadingsByPatient(id);

        if (!patient) {
            res.status(404).json({
                err: "No readings found",
            });
            return;
        }

        res.status(200).json(patient);
    },

    getScanReports: async (req, res) => {
        const patient_id = req.params.id;
        let reports = await getPatientScanReports(patient_id);

        if (!reports) {
            res.status(404).json({
                err: "No reports found",
            });
            return;
        }

        reports = reports.map(report => {
            report['image_uri'] = `${req.protocol}://${req.get('host')}/static/scans/${report['image_uri']}`
            return report;
        })

        res.status(200).json(reports);
    },

    getScanReport: async (req, res) => {
        const patient_id = req.patient;
        const report_id = req.params.report;
        let [report] = await getPatientScanReport(report_id, patient_id);

        if (!report) {
            res.status(404).json({
                err: "Report not found",
            });
            return;
        }

        report['image_uri'] = `${req.protocol}://${req.get('host')}/static/scans/${report['image_uri']}`;

        res.status(200).json(report);
    },

}