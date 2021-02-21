import { APPOINTMENT_STATES } from '../helpers/constants';
import { 
    fetchRequestsById, 
    createRequest,
    updateRequest,
    deleteRequest,
} from '../models/meds-refill';

export default {

    getRequestByToken: async (req, res) => {

        const id = req._id;
        const role = req._role;

        const appointments = await fetchRequestsById(id, role);

        res.status(200).json({
            appointments,
        });
    },

    postRequestsByToken: async (req, res) => {
        const patient_id = req._id;
        const { doctor_id, date, description } = req.body;

        if (!doctor_id || !date || !description) {
            res.status(400).json({
                err: "Required: doctor_id, description"
            });
            return;
        }

        const created = await createRequest({
            patient_id,
            doctor_id,
            date,
            description
        });

        if (!created) {
            res.status(500).json({
                err: "An error occured"
            })
            return;
        }

        res.status(200).json({
            msg: "Request created successfully"
        });
    },

    updateRequestStatus: async (req, res) => {
        const doctor_id = req._id;
        const { id, status } = req.body;

        if (!APPOINTMENT_STATES.includes(status)){
            res.status(400).json({
                err: `${status} is not a valid request status`
            });
            return;
        }

        const updated = await updateRequest(doctor_id, id, status);

        if (!updated){
            res.status(500).json({
                err: "An error occured"
            });
            return;
        }

        res.status(200).json({
            msg: "Status updated successfully"
        })
    },

    deleteRequestById: async (req, res) => {
        const patient_id = req._id;
        const id = req.params.id;

        const deleted = await deleteRequest(patient_id, id);

        if (!deleted) {
            res.status(500).json({
                err: "An error occured"
            });
            return;
        }

        res.status(200).json({
            msg: "Request deleted successfully"
        })
    }
}