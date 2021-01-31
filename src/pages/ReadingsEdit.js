import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { fetchUniquePatientReadings } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import {putPatientReadings} from '../helpers/api';

function Readings(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const id = props.match.params.id;

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const { data } = await fetchUniquePatientReadings(id);
            setData(data);
            setIsLoading(false);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const { register, handleSubmit, errors } = useForm();

    async function postSubmit(reading) {
        setIsLoading(true);
        const { status, data } = await putPatientReadings(reading, id);

        if (status) {
            props.history.push({
                pathname: "/readings",
                state: {
                    success: "Readings updated successfully"
                }
            });
        } else {
            setIsLoading(false);
            setIsError(true);
            setErrorMsg(data.err);
        }
    }

    console.log(isData);
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
                                    <li className="breadcrumb-item active">Edit Readings</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <Link to={'/readings'} className="btn add-btn"><i className="fa fa-arrow-left"></i> Back to Readings</Link>
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
                                                })} className="form-control" name="blood_sugar" type="text" placeholder="Blood Sugar" defaultValue={!isLoading ? isData.blood_sugar : ''} />
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
                                                })} className="form-control" name="blood_pressure" type="text" placeholder="Blood Pressure" defaultValue={!isLoading ? isData.blood_pressure : ''} />
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
                                                })} className="form-control" name="heart_rate" type="text" placeholder="Heart Rate" defaultValue={!isLoading ? isData.heart_rate : ''} />
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
                                                })} className="form-control" name="temperature" type="text" placeholder="Temperature" defaultValue={!isLoading ? isData.temperature : ''} />
                                                {errors.temperature && <label className="error">{errors.temperature.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-actions text-right">
                                            <button type="submit" className="btn btn-danger">Update</button>
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