import { doQueryParams } from "../setup/db.js";

export const checkFlatRate = async (start, dest, id) => {
    let query = "Select * from flat_rates where start = ? AND dest = ? AND provider_id = ?";
    const flatRates = await doQueryParams(query, [start, dest, id]);
    if (flatRates.length > 0) {
        return true
    }
    return false;
}

export const getProviderById = async (provider_id) => {
    let query = "SELECT * FROM providers WHERE provider_id = ? LIMIT 1";
    return doQueryParams(query, [provider_id]);
}

export const getManagerById = async (provider_id) => {
    let query = "SELECT * FROM managers WHERE provider_id = ? LIMIT 1";
    return doQueryParams(query, [provider_id]);
}

export const getFlatRatesByProviderId = async (provider_id) => {
    let query = "SELECT * FROM flat_rates WHERE provider_id = ?";
    return doQueryParams(query, [provider_id]);
}

export const deleteFlatRateById = async (id, provider_id) => {
    let query = "DELETE FROM `flat_rates` WHERE id = ? AND provider_id = ?";
    const response = await doQueryParams(query, [id, provider_id]);

    if (response.affectedRows === 1) {
        return true
    }
    return false;
}

export const createFlatRate = async (data) => {
    let query = "INSERT INTO flat_rates SET ?";
    const response = await doQueryParams(query, [data]);

    if (response.affectedRows === 1) {
        return response.insertId
    }
    return null;
}

export const updateFlatRateById = async (data, provider_id) => {
    let query = "UPDATE flat_rates SET small = ?, partner_small = ?, medium = ?, partner_medium = ?, large = ?, partner_large = ? WHERE id = ? AND provider_id = ?";
    const response = await doQueryParams(query, [...data, provider_id]);

    if (response.affectedRows === 1) {
        return true
    }
    return false;
}

export const updateProfileById = async (queryExtension, data, provider_id, table) => {
    let query = `UPDATE ${table} SET ${queryExtension} WHERE provider_id = ? `;
    const response = await doQueryParams(query, [...data, provider_id]);

    if (response.affectedRows === 1) {
        return true
    }
    return false;
}