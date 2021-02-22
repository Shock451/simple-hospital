import { doQueryParams } from "../setup/db.js";

export const getPatients = async (search) => {
    let condition = "";
    if (search) {
        condition = `AND (name like '%${search}%' OR email like '%${search}%' or mobile like '%${search}%')`;
    }
    let query = `SELECT * FROM users WHERE role = 'patient' ${condition}`;
    return doQueryParams(query);
}

export const getPatient = async (id) => {
    let query = `SELECT * FROM users WHERE id = ? AND role = 'patient'`;
    return doQueryParams(query, [id]);
}

export const getPatientProfile = async (id) => {
    let query = `SELECT * FROM patients WHERE user_id = ?`;
    return doQueryParams(query, [id]);
}

export const getReadingsByPatient = (id, days = 30) => {
    let query = `SELECT * FROM patient_readings WHERE patient_id = ? AND created >= CURDATE() - INTERVAL ${days} DAY`;
    return doQueryParams(query, [id]);
}

export const getReadingByPatient = (id) => {
    let query = `SELECT * FROM patient_readings WHERE id = ?`;
    return doQueryParams(query, [id]);
}

export const addReadingsById = async (data) => {
    let query = "INSERT INTO patient_readings set ?";
    const response = await doQueryParams(query, [data]);
    if (response.affectedRows === 1) {
        return true
    }
    return false;
}

export const updateReadingsById = async (reading_id, data) => {
    let query = `UPDATE patient_readings SET ? WHERE id = ?`;
    const response = await doQueryParams(query, [data, reading_id]);
    if (response.affectedRows === 1) {
        return true;
    }
    return false;
}

export const deleteReadingsById = async (reading_id) => {
    let query = "DELETE FROM patient_readings WHERE id = ?";
    const response = await doQueryParams(query, [reading_id]);
    if (response.affectedRows === 1) {
        return true
    }
    return false;
}