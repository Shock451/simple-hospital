import { ROLES } from "../helpers/constants.js";
import { doQueryParams } from "../setup/db.js";

export const fetchRequestsById = async (id, role) => {
    let inverted_role = ROLES[0];
    if(role === ROLES[0]){
        inverted_role = ROLES[1];
    }
    let query = `SELECT medsrefill.*, users.name FROM medsrefill, users 
    WHERE medsrefill.${role}_id = ? AND medsrefill.${inverted_role}_id = users.id `;
    return doQueryParams(query, [id]);
    
}

export const createRequest = async (data) => {
    let query = `INSERT INTO medsrefill SET ?`;
    const response = await doQueryParams(query, data);
    if (response.affectedRows === 1) {
        return true;
    }
    return false;
}

export const updateRequest = async (doctor_id, id, status) => {
    let query = `UPDATE medsrefill SET status = ? WHERE doctor_id = ? AND id = ?`;
    const response = await doQueryParams(query, [status, doctor_id, id]);
    if (response.affectedRows === 1){
        return true;
    }
    return false;
}

export const deleteRequest = async (patient_id, id) => {
    let query = `DELETE FROM medsrefill WHERE patient_id = ? AND id = ?`;
    const response = await doQueryParams(query, [patient_id, id]);
    if (response.affectedRows === 1) {
        return true;
    }
    return false;
}