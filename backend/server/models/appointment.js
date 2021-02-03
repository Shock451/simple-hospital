import { doQueryParams } from "../setup/db.js";

export const fetchAppointmentsById = async (id, role) => {
    let query = `SELECT * FROM appointments WHERE ${role}_id = ?`;
    return doQueryParams(query, [id]);
}

export const createAppointment = async (data) => {
    let query = `INSERT INTO appointments SET ?`;
    const response = await doQueryParams(query, data);
    if (response.affectedRows === 1) {
        return true;
    }
    return false;
}

export const updateAppointment = async (doctor_id, id, status) => {
    let query = `UPDATE appointments SET status = ? WHERE doctor_id = ? AND id = ?`;
    const response = await doQueryParams(query, [status, doctor_id, id]);
    if (response.affectedRows === 1){
        return true;
    }
    return false;
}

export const deleteAppointment = async (patient_id, id) => {
    let query = `DELETE FROM appointments WHERE patient_id = ? AND id = ?`;
    const response = await doQueryParams(query, [patient_id, id]);
    if (response.affectedRows === 1) {
        return true;
    }
    return false;
}