import { doQueryParams } from "../setup/db.js";

export const fetchContactList = async (user_id, role) => {
    let role_inverse = role === "patient"? "doctor" : "patient";
    
    let query = `
    SELECT * FROM
        (
            SELECT to_id AS user_id FROM chat WHERE from_id = ${user_id} 
            UNION 
            SELECT from_id from chat WHERE to_id = ${user_id}
        ) t1 
    INNER JOIN 
        (
            SELECT id, name, email FROM users WHERE role = '${role_inverse}'
        ) t2
    ON  t1.user_id = t2.id
    `;
    return doQueryParams(query);
}

export const fetchMessages = async (user_id, recipient_id) => {
    let query = `
        SELECT * FROM chat WHERE 
        (from_id = ${user_id} AND to_id = ${recipient_id})
        OR
        (from_id = ${recipient_id} AND to_id = ${user_id}) 
    `;
    return doQueryParams(query);
}

export const sendMessage = async (message) => {
    let query = `INSERT INTO chat SET ?`;
    const response = await doQueryParams(query, [message]);
    if (response.affectedRows === 1) {
        return true
    }
    return false;
}