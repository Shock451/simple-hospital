import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { checkEmail, createUser, getProfile, getUsersByEmail, getUsersById } from "../models/user.js";
import { ROLES } from '../helpers/constants';

export default {

    getUserProfile: async (req, res) => {
        const id = req._id;
        const role = req._role;

        let [user] = await getUsersById(id);

        if (!user) {
            res.status(404).json({
                error: "user does not exist",
            });
            return;
        }

        let [userDetails] = await getProfile(id, role);

        if (!userDetails) {
            res.status(404).json({
                error: "profile does not exist",
            });
            return;
        }

        res.status(200).json({
            email: user.email,
            mobile: user.mobile,
            name: user.name,
            role: user.role,
            address: userDetails.address,
            city: userDetails.city,
            state: userDetails.state,
            description: userDetails.description            
        });
    },

    login: async (req, res) => {

        const { email, password, role } = req.body;

        let [user] = await getUsersByEmail(email, role);

        if (!user) {
            res.status(401).json({
                msg: "User not found."
            });
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.status(401).json({
                msg: "Invalid email or password."
            });
            return;
        }

        let token = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.APP_SECRET, {
            expiresIn: "20h"
        });

        res.status(200).json({
            token
        });
        return;
    },

    registerUser: async (req, res) => {

        let { name, email, mobile, password, role } = req.body;

        if (!email || !mobile || !password || !name || !role) {
            res.status(400).json({
                msg: 'Please provide name/mobile/email/password.'
            });
            return;
        }

        if (!Object.values(ROLES).includes(role)) {
            res.status(400).json({
                msg: 'Invalid user role.'
            });
            return;
        }

        let userExists = await checkEmail(email, role);

        if (userExists) {
            res.status(400).json({
                msg: 'User already exists.'
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreated = await createUser({
            name,
            email,
            mobile,
            password: hashedPassword,
            role,
        });

        if (userCreated) {
            res.status(200).json({
                msg: 'User successfully created.'
            });
        } else {
            res.status(500).json({
                msg: 'An error occured.'
            });
        }

    }
}