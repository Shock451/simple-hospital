import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    getPatients,
    getPatient,
    getPatientProfile,

    getPatientScanReport,
    getPatientScanReports,

    getReadingsByPatient,
    getReadingByPatient,
    addReadingsById,
    updateReadingsById,
    deleteReadingsById,
} from "../models/patient.js";

export default {

    getAllPatients: async (req, res) => {

        var search = req.query.search;

        let patients = await getPatients(search);

        if (patients.length === 0) {
            res.status(404).json({
                err: "There are no patients available",
            });
            return;
        }

        res.status(200).json(patients);
    },

    getPatientByToken: async (req, res) => {

        const id = req._id;

        let patient = await getPatientProfile(id);

        if (!patient) {
            res.status(404).json({
                err: "Patient does not exist",
            });
            return;
        }

        res.status(200).json(patient);
    },

    getPatientProfile: async (req, res) => {

        const id = req.params.id;

        let [user] = await getPatient(id);
        let [patient] = await getPatientProfile(id);
        let readings = await getReadingsByPatient(id);

        if (!user) {
            res.status(404).json({
                err: "Patient does not exist",
            });
            return;
        }

        res.status(200).json({
            user,
            patient,
            readings
        });
    },

    getReadingsByPatientId: async (req, res) => {
        const id = req._id;

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
        const id = req._id;
        let reports = await getPatientScanReports(id);

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
        const patient_id = req._id;
        const report_id = req.params.id;
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

    getReadingByPatientId: async (req, res) => {

        const id = req.params.id;

        let [record] = await getReadingByPatient(id);

        if (!record) {
            res.status(404).json({
                err: "Not found",
            });
            return;
        }

        res.status(200).json(record);
    },

    postReadingsByPatientId: async (req, res) => {
        const user_id = req.params.id;
        // const { blood_pressure, blood_sugar, heart_rate, temperature } = req.body;

        // let added = await addReadingsById({
        //     patient_id: user_id,
        //     blood_pressure,
        //     blood_sugar,
        //     heart_rate,
        //     temperature,
        //     height,
        //     weight,
        //     prescribed
        // });

        let added = await addReadingsById({ ...req.body, patient_id: user_id });

        if (!added) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Record added successfully"
        });
    },

    updateReadingByPatientId: async (req, res) => {
        const id = req.params.id;
        const { blood_pressure, blood_sugar, heart_rate, temperature, height, weight, prescribed, prescription } = req.body;

        let updated = await updateReadingsById(id, {
            blood_pressure,
            blood_sugar,
            heart_rate,
            temperature,
            height,
            weight,
            prescribed,
            prescription
        });

        if (!updated) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Record updated successfully"
        });
    },

    deleteReadingsByPatientId: async (req, res) => {
        const reading_id = req.params.id;

        let deleted = await deleteReadingsById(reading_id);

        if (!deleted) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Record deleted successfully"
        });
    },
}