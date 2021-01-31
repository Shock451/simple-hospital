import jwt from "jsonwebtoken";

import {
    fetchContactList,
    fetchMessages,
    sendMessage,
} from "../models/chat.js";
import { getUsersById } from "../models/user.js";


export default {

    getContactList: async (req, res) => {
        const user_id = req._id;
        const role = req._role;

        const contactList = await fetchContactList(user_id, role);

        res.status(200).json({ contactList });
    },

    getMessages: async (req, res) => {
        const user_id = req._id;
        const recipient_id = req.params.recipient_id;

        const messages = await fetchMessages(user_id, recipient_id);
        const [recipientDetails] = await getUsersById(recipient_id);

        res.status(200).json({
            messages,
            recipientDetails: {
                name: recipientDetails.name
            }
        });

    },

    postMessage: async (req, res) => {
        const from_id = req._id;
        const { message, to_id } = req.body;

        const sent = await sendMessage({ from_id, to_id, message });

        if (!sent) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Message sent successfully"
        });
    }
}