import { doQueryParams } from "../setup/db.js";



export const getProfile = async (id, role) => {
    let query = `SELECT address, city, state, description FROM ${role}s WHERE user_id = ?`;
    return doQueryParams(query, [id]);
}

export const checkEmail = async (email) => {
    let users = await getUsersByEmail(email)
    if (users.length > 0) {
        return true
    }
    return false;
}

export const getUsersByEmail = async (email) => {
    let query = "Select * from users where email = ?";
    return doQueryParams(query, [email]);
}

export const getUsersById = async (id) => {
    let query = "Select * from users where id = ?";
    return doQueryParams(query, [id]);
}

export const createUser = async (user) => {
    let query = "INSERT INTO users set ?";
    const response = await doQueryParams(query, [user]);
    if (response.affectedRows === 1) {
        return true
    }
    return false;
}

export const updateProfile = async (id, role, data) => {

    let query = `UPDATE users, ${role}s 
        SET ?
        WHERE users.id = ${role}s.user_id AND users.id = ${id}
    `;
    const response = await doQueryParams(query, data);
    if (response.affectedRows === 2) {
        return true;
    }
    return false;
}