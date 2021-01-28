import jwt from "jsonwebtoken";

import {
    getProviderById,
    getManagerById,
    updateProfileById,
    getFlatRatesByProviderId,
    createFlatRate,
    checkFlatRate,
    deleteFlatRateById,
    updateFlatRateById,
} from "../models/chat.js";

import fieldLists from '../data/fieldLists';

function formatUpdateQuery(obj, fieldList) {
    let data = [], queryExtension = "";
    Object.keys(obj).forEach(key => {
        if (fieldList.includes(key)) {
            queryExtension += `${key}=?,`;
            data.push(obj[key]);
        }
    });
    // remove the trailing comma from the query extension
    queryExtension = queryExtension.slice(0, -1);
    return [queryExtension, data];
}

export default {

    getFlatRates: async (req, res) => {

        let provider_id = req._id;

        let flatRates = await getFlatRatesByProviderId(provider_id);

        res.status(200).json({
            flatRates,
        });
        return;
    },

    createFlatRate: async (req, res) => {

        let provider_id = req._id;

        const { start, dest, small, partner_small, medium, partner_medium, large, partner_large } = req.body;

        if (!start || !dest || (!small && !medium && !large)) {
            res.status(400).json({
                msg: 'Please provide the pickup location and destination and at least one price.'
            });
            return;
        }

        let flatRateExists = await checkFlatRate(start, dest, provider_id);

        if (flatRateExists) {
            res.status(400).json({
                msg: 'Flat rate already exists.'
            });
            return;
        }

        const createdFlatRateId = await createFlatRate({
            start, dest, small, partner_small, medium, partner_medium, large, partner_large, provider_id
        });

        if (createdFlatRateId !== null) {
            res.status(200).json({
                msg: 'Flat Rate successfully created.',
                id: createdFlatRateId,
            });
        } else {
            res.status(500).json({
                msg: 'An error occured.'
            });
        }
    },

    deleteFlatRate: async (req, res) => {

        let provider_id = req._id;
        let { id } = req.params;

        let deleted = await deleteFlatRateById(id, provider_id);

        if (deleted) {
            res.status(200).json({
                msg: 'Flat Rate deleted successfully.'
            });
        } else {
            res.status(500).json({
                msg: 'An error occured.'
            });
        }
    },

    updateFlatRate: async (req, res) => {

        let provider_id = req._id;

        let {
            small,
            partner_small,
            medium,
            partner_medium,
            large,
            partner_large,
            id
        } = req.body;

        let successfulUpdate = await updateFlatRateById([
            small,
            partner_small,
            medium,
            partner_medium,
            large,
            partner_large,
            id
        ], provider_id);

        if (successfulUpdate) {
            res.status(200).json({
                msg: 'Flat Rate updated successfully.'
            });
        } else {
            res.status(500).json({
                msg: 'An error occured.'
            });
        }
    },

    getProfile: async (req, res) => {

        let provider_id = req._id;

        let [companyDetails] = await getProviderById(provider_id);
        let [managerDetails] = await getManagerById(provider_id);

        if (companyDetails && managerDetails) {
            res.status(200).json({
                companyDetails,
                managerDetails
            });
        } else {
            res.status(404).json({
                msg: "Could not retrieve profile information."
            });
        }
    },

    updateProfile: async (req, res) => {

        let provider_id = req._id;

        let [query, data] = formatUpdateQuery(req.body, fieldLists.providers);

        let successfulUpdate = await updateProfileById(query, data, provider_id, "providers");

        if (successfulUpdate) {
            res.status(200).json({
                msg: 'Profile updated successfully.'
            });
        } else {
            res.status(500).json({
                msg: 'An error occured.'
            });
        }
    },

    updateManagerProfile: async (req, res) => {

        let provider_id = req._id;

        let [query, data] = formatUpdateQuery(req.body, fieldLists.managers);

        let successfulUpdate = await updateProfileById(query, data, provider_id, "managers");

        if (successfulUpdate) {
            res.status(200).json({
                msg: 'Manager Profile updated successfully.'
            });
        } else {
            res.status(500).json({
                msg: 'An error occured.'
            });
        }
    },
}