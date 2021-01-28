import { doQueryParams } from "../setup/db.js";

export const getPatients = async () => {
    let query = `SELECT * FROM patients`;
    return doQueryParams(query);
}

export const getPatient = async (id) => {
    let query = `SELECT * FROM patients WHERE user_id = ?`;
    return doQueryParams(query, [id]);
}