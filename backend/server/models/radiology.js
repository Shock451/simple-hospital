import { doQueryParams } from "../setup/db.js";

export const uploadReport = async (data) => {
    let query = `INSERT INTO radiology_scans SET ?`;
    const response = await doQueryParams(query, data);
    if (response.affectedRows === 1) {
        return true;
    }
    return false;
}