import { doQueryParams } from "../setup/db.js";

export const getDoctors = async () => {
    let query = `SELECT * FROM doctors`;
    return doQueryParams(query);
}

export const getDoctor = async (id) => {
    let query = `SELECT * FROM doctors WHERE user_id = ?`;
    return doQueryParams(query, [id]);
}