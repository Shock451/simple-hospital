import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { postPatientReadings } from "../helpers/api";

function Readings(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const id = props.match.params.id;

    const { register, handleSubmit, errors } = useForm();

    async function postSubmit(reading) {
        setIsLoading(true);
        const { status, data } = await postPatientReadings(id, reading)
        if (status) {
            props.history.push({
                pathname: "/patient_details/" + id,
                state: {
                    success: "Readings addedd successfully"
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
                                <h3 className="page-title">Readings</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/readings'}>Readings</Link></li>
                                    <li className="breadcrumb-item active">Add New Readings</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <Link to={'/patient_details/' + id} className="btn add-btn"><i className="fa fa-arrow-left"></i> Back to Readings</Link>
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
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">Readings Info</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label>Blood Sugar <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="blood_sugar" type="text" placeholder="Blood Sugar" />
                                                {errors.blood_sugar && <label className="error">{errors.blood_sugar.message}</label>}
                                            </div>
                                            <div className="col-md-4">
                                                <label>Blood Pressure <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="blood_pressure" type="text" placeholder="Blood Pressure" />
                                                {errors.blood_pressure && <label className="error">{errors.blood_pressure.message}</label>}
                                            </div>
                                            <div className="col-md-4">
                                                <label>Heart Rate <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="heart_rate" type="text" placeholder="Heart Rate" />
                                                {errors.heart_rate && <label className="error">{errors.heart_rate.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label>Temperature <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="temperature" type="text" placeholder="temperature" />
                                                {errors.temperature && <label className="error">{errors.temperature.message}</label>}
                                            </div>
                                            <div className="col-md-4">
                                                <label>Height <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                })} className="form-control" name="height" type="text" placeholder="height" />
                                                {errors.height && <label className="error">{errors.height.message}</label>}
                                            </div>
                                            <div className="col-md-4">
                                                <label>Weight <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                })} className="form-control" name="weight" type="text" placeholder="weight" />
                                                {errors.weight && <label className="error">{errors.weight.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-8">
                                                <label>Prescription <em>*</em></label>
                                                <textarea ref={register({
                                                    required: "This field is required",
                                                })} className="form-control" name="prescription" type="text" placeholder="How many drugs are you prescribing?"> </textarea>
                                                {errors.prescription && <label className="error">{errors.prescription.message}</label>}
                                            </div>
                                            <div className="col-md-4">
                                                <label>No. Drugs prescribed</label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="prescribed" type="text" placeholder="0" />
                                                {errors.prescribed && <label className="error">{errors.prescribed.message}</label>}
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

export default Readings;