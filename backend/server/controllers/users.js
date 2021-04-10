/* eslint-disable import/no-anonymous-default-export */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { checkEmail, createUser, getProfile, getUsersByEmail, getUsersById, updateProfile, getStaffList, deleteUser, deleteProfile } from "../models/user.js";
import { ROLES } from '../helpers/constants';

export default {

    getUserProfile: async (req, res) => {
        const id = req._id;
        const role = req._role;

        let [user] = await getUsersById(id);

        if (role === ROLES[3]) {
            res.status(200).json({
                email: user.email,
                mobile: user.mobile,
                name: user.name,
                role: user.role,
            });
            return;
        }

        if (!user) {
            res.status(404).json({
                err: "user does not exist",
            });
            return;
        }

        let [userDetails] = await getProfile(id, role);

        if (!userDetails) {
            res.status(404).json({
                err: "profile does not exist",
            });
            return;
        }

        res.status(200).json({
            email: user.email,
            mobile: user.mobile,
            name: user.name,
            role: user.role,
            ...userDetails
        });
    },

    getStaffList: async (req, res) => {
        let staffList = await getStaffList();
        res.status(200).json({ staffList });
        return;
    },

    deleteStaff: async (req, res) => {
        let { id, role } = req.body;
        let deletedUser = await deleteUser(id);
        let deletedProfile = await deleteProfile(id, role);

        if (!(deletedUser && deletedProfile)) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Staff deleted successfully"
        });
    },

    updateUserProfile: async (req, res) => {
        const user_id = req._id;
        const role = req._role;

        const { address, gender, description, city, state, email, name, mobile, old_password, password, password2 } = req.body;

        const data = {
            address,
            description,
            gender,
            city,
            state,
            email,
            name,
            mobile,
            ...role === ROLES[0] ?
                {
                    allergies: req.body.allergies,
                    dob: req.body.dob
                } :
                {
                    license_num: req.body.license_num
                }
        };

        if (email) {
            let [user] = await getUsersByEmail(email);

            if (user_id !== user.id && user.email === email) {
                res.status(400).json({
                    err: 'Email already taken'
                });
                return;
            }
        }

        let hashedPassword = "";
        if (old_password && password && password2) {
            if (password !== password2) {
                res.status(400).json({
                    err: "Passwords do not match"
                });
                return;
            }
            let [user] = await getUsersById(user_id);
            if (!user) {
                res.status(404).json({
                    err: "Your account cannot be found"
                });
                return;
            }
            const validPassword = await bcrypt.compare(old_password, user.password);
            if (!validPassword) {
                res.status(401).json({
                    err: "Invalid old password"
                });
                return;
            }
            hashedPassword = await bcrypt.hash(password, 10);
            data["password"] = hashedPassword;
        }

        let updated = await updateProfile(user_id, role, data);

        if (!updated) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Profile updated successfully"
        });
    },

    login: async (req, res) => {

        const { email, password } = req.body;

        let [user] = await getUsersByEmail(email);

        if (!user) {
            res.status(401).json({
                err: "User not found."
            });
            return;
        }

        let validPassword = true;
        if (user.role !== ROLES[3]) {
            validPassword = await bcrypt.compare(password, user.password);
        };

        if (!validPassword) {
            res.status(401).json({
                err: "Invalid email or password."
            });
            return;
        }

        let token = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.APP_SECRET, {
            expiresIn: "20h"
        });

        res.status(200).json({ token });
        return;
    },

    registerUser: async (req, res, next) => {

        let { name, email, mobile, password, role } = req.body;

        if (!email || !mobile || !password || !name || !role) {
            res.status(400).json({
                err: 'Please provide name/mobile/email/password.'
            });
            return;
        }

        if (!Object.values(ROLES).includes(role)) {
            res.status(400).json({
                err: 'Invalid user role.'
            });
            return;
        }

        let userExists = await checkEmail(email);

        if (userExists) {
            res.status(400).json({
                err: 'Email already taken'
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
            next();
        } else {
            res.status(500).json({
                err: 'An error occured.'
            });
        }

    }
}