import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchPatientReadings } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import {BASE_URL} from '../helpers/constants';
import { convertDate, calculateBMI } from '../helpers/functions';

function Readings(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [readings, setReadings] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function fetchData() {
        setIsLoading(true);
        const { data } = await fetchPatientReadings();
        setReadings(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function deletePatient(id) {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        let status;
        fetch(BASE_URL + '/patients/readings/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': 'application/json',
            }
        }).then((response) => {
            status = response.status;
            return response.json();
        })
            .then((result) => {
                if (status) {
                    setIsLoading(false);
                    props.history.push({
                        pathname: "/readings",
                        state: {
                            success: "Reading deleted successfully"
                        }
                    });
                    fetchData();
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    setErrorMsg(result.message);
                }
            }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg("Not able to connect with API try again after sometime.");
                console.log(e);
            });
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
                                    <li className="breadcrumb-item active">Readings</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        props.location.state
                            ?
                            props.location.state.success
                                ?
                                <div className="alert alert-success alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert">
                                    </button> {props.location.state.success}
                                </div>
                                :
                                null
                            :
                            null
                    }
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
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Blood Sugar(mg/dL)</th>
                                        <th>Blood Pressure(mmHg)</th>
                                        <th>Heart Rate(BPM)</th>
                                        <th>Temperature(C)</th>
                                        <th>BMI(kg/m2)</th>
                                        <th>No. Drugs</th>
                                        <th>Prescription</th>
                                    </tr>
                                </thead>
                                {

                                    !isLoading
                                        ?
                                        <tbody>
                                            {
                                                readings.map(function (data, index) {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{convertDate(data.updated)}</td>
                                                            <td>{data.blood_sugar}</td>
                                                            <td>{data.blood_pressure}</td>
                                                            <td>{data.heart_rate}</td>
                                                            <td>{data.temperature}</td>
                                                            <td>{calculateBMI(data.height, data.weight)}</td>
                                                            <td>{data.prescribed}</td>
                                                            <td>{data.prescription}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :
                                        null
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Readings;