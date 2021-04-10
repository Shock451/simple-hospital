import { doQueryParams } from "../setup/db.js";

export const getStaffList = async () => {
    let query = "SELECT * FROM users WHERE role = 'doctor' or role = 'radiologist'";
    return doQueryParams(query);
}

export const deleteUser = async (id) => {
    let query = `DELETE FROM users WHERE id = ?`;
    return doQueryParams(query, [id]);
}

export const deleteProfile = async (id, role) => {
    let query = ` DELETE FROM ${role}s WHERE user_id = ?`;
    return doQueryParams(query, [id]);
}

export const getProfile = async (id, role) => {
    // let roleSpecificFields = role === ROLES[0] ? 'dob, alergies'  : 'license_num';
    // let query = `SELECT address, city, state, description, gender, ${roleSpecificFields} FROM ${role}s WHERE user_id = ?`;
    let query = `SELECT * FROM ${role}s WHERE user_id = ?`;
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