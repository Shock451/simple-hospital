import { ROLES } from "../helpers/constants.js";
import { doQueryParams } from "../setup/db.js";

export const fetchAppointmentsById = async (id, role) => {
    let inverted_role = ROLES[0];
    if(role === ROLES[0]){
        inverted_role = ROLES[1];
    }
    let query = `SELECT appointments.*, users.name FROM appointments, users 
    WHERE appointments.${role}_id = ? AND appointments.${inverted_role}_id = users.id `;
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