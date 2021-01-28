import { doQueryParams } from "../setup/db.js";



export const getProfile = async (id, role) => {
    let query = `SELECT address, city, state, description FROM ${role}s WHERE user_id = ?`;
    return doQueryParams(query, [id]);
}

export const checkEmail = async (email, role) => {
    let users = await getUsersByEmail(email, role)
    if (users.length > 0) {
        return true
    }
    return false;
}

export const getUsersByEmail = async (email, role) => {
    let query = "Select * from users where email = ? AND role = ?";
    return doQueryParams(query, [email, role]);
}

export const getUsersById = async (id) => {
    let query = "Select * from users where id = ?";
    return doQueryParams(query, [id]);
}

export const createUser = async (user) => {
    let query = "INSERT INTO users set ?";
    const response= await doQueryParams(query, [user]);
    if (response.affectedRows === 1){
        return true
    } 
    return false;
}