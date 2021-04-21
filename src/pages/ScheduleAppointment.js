import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { fetchDoctorList, postAppointment } from "../helpers/api";

function ScheduleAppointment(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [doctorList, setDoctorList] = useState([]);

    const { register, handleSubmit, errors } = useForm();

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { status, data } = await fetchDoctorList()
            if (status === 200) {
                setDoctorList(data.doctors);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg(data.err);
            }
        }
        fetchData();
    }, [])


    async function postSubmit(appointment) {
        setIsLoading(true);
        const { status, data } = await postAppointment(appointment)
        if (status === 200) {
            props.history.push({
                pathname: "/appointments",
                state: {
                    success: "Appointment requested successfully"
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
                                <h3 className="page-title">Schedule Appointment</h3>
                                <ul className="breadcrumb">
                                    {/* <li className="breadcrumb-item"><Link to={'/readings'}>Schedule Appointment</Link></li> */}
                                    <li className="breadcrumb-item active">Schedule Appointment</li>
                                </ul>
                            </div>
                            {/* <div className="col-auto float-right ml-auto">
                                <Link to={'/readings'} className="btn add-btn"><i className="fa fa-arrow-left"></i> Back to Readings</Link>
                            </div> */}
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
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">Appointment Info</h4>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <label> Doctor <em>*</em></label>
                                        <select className="form-control" name="doctor_id" ref={register}>
                                            {doctorList && doctorList.map(doctor => (
                                                <option key={`doctor-${doctor.id}`} value={doctor.id}>{doctor.name}</option> //doctor.id gets passed to the api since it is the value and doctor.name is displayed in the drop down list
                                            ))}
                                        </select>
                                        {errors.doctor_id && <label className="error">{errors.doctor_id.message}</label>}
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <div className="col-md-12 mt-3">
                                                <label>Reason for appointment<em>*</em></label>
                                                <textarea ref={register({
                                                    required: "This field is required",
                                                    maxLength:1000
                                                   
                                                })} className="form-control" name="description" type="text" placeholder="Reason For Appointment"> </textarea> 
                                                {errors.description && <label className="error">{errors.description.message}</label>}
                                                
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <label>Date and Time<em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",

                                                   
                                                })} className="form-control" name="date" type="datetime-local" min="" max=""/>
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

export default ScheduleAppointment;