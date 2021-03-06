import {
    uploadReport,
    // createRequest,
    // updateRequest,
    // deleteRequest,
} from '../models/radiology';

export default {

    uploadScanReport: async (req, res) => {
        const { patient_id, description } = req.body;

        if (!req.file) {
            return res.send({
                success: false
            });
        } 

        const uploaded = await uploadReport({
            patient_id, 
            report: description, 
            image_uri: req.file.filename,
        });

        if (!uploaded) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Scan report uploaded successfully"
        });
    },
}