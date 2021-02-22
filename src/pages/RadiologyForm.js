import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { fetchPatientList, postRequest } from "../helpers/api";

function RadiologyForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [patientList, setPatientList] = useState([]);

    const { register, handleSubmit, errors } = useForm();

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { status, data } = await fetchPatientList()
            if (status === 200) {
                setPatientList(data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg(data.err);
            }
        }
        fetchData();
    }, [])


    async function postSubmit(report) {
        setIsLoading(true);
        const { status, data } = await postRequest(report)
        if (status === 200) {
            props.history.push({
                pathname: "/",
                state: {
                    success: "Radiology scan report uploaded successfully."
                }
            });
        } else {
            setIsLoading(false);
            setIsError(true);
            setErrorMsg(data.err);
        }
    }


    return (
        <div className="main-wrapper">
            {
                isLoading
                    ?
                    <Loader />
                    :
                    null
            }
            <Header data={props} />
            <Sidebar data={props} />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Upload Radiology Results</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Add patient's scan results</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <form onSubmit={handleSubmit(postSubmit)}>
                                    {
                                        isError
                                            ?
                                            <div className="alert alert-danger alert-dismissible" role="alert">
                                                <button type="button" className="close" data-dismiss="alert">
                                                </button>
                                                {errorMsg}
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="col-md-12 mt-3">
                                        <label> Patient <em>*</em></label>
                                        <select className="form-control" name="patient_id" ref={register({ required: true })}>
                                            <option value="">Select a doctor</option>
                                            {patientList && patientList.map(patient => (
                                                <option key={`doctor-${patient.id}`} value={patient.id}>{patient.name}</option> //doctor.id gets passed to the api since it is the value and doctor.name is displayed in the drop down list
                                            ))}
                                        </select>
                                        {errors.patient_id && <label className="error">{errors.patient_id.message}</label>}
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <div className="col-md-12 mt-3">
                                                <label>Report description<em>*</em></label>
                                                <textarea ref={register({
                                                    required: "This field is required",
                                                    maxLength: 1000

                                                })} className="form-control" name="description" type="text" placeholder="Reason For Appointment"> </textarea>
                                                {errors.description && <label className="error">{errors.description.message}</label>}

                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <label>Scanned image<em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    maxLength: 1000

                                                })} className="form-control" name="image" type="file" />
                                                {errors.image && <label className="error">{errors.image.message}</label>}

                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <label>Date and Time<em>*</em></label>
                                                <input ref={register({
                                                })} className="form-control" name="date" type="datetime-local" />
                                                {errors.date && <label className="error">{errors.date.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-actions text-right">
                                            <button type="submit" className="btn btn-danger">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default RadiologyForm;