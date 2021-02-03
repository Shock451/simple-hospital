import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchPatientReadings } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import {BASE_URL} from '../helpers/constants';
import { useAppContext } from "../Context";
// import { convertDate } from '../helpers/functions';

function Appointments(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { appState } = useAppContext();

    async function fetchData() {
        setIsLoading(true);
        const { data } = await fetchPatientReadings();
        setAppointments([]);
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
                            success: "Appoint"
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
                                <h3 className="page-title">Appointments</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Appointments</li>
                                </ul>
                            </div>
                            { appState && appState.user.role === 'patient' && 
                                <div className="col-auto float-right ml-auto">
                                <Link to={'/schedule_appointment'} className="btn add-btn"><i className="fa fa-plus"></i> Schedule New Appointment</Link>
                            </div>
                            }
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
                                        <th>Doctor</th>
                                        <th>Date and Time</th>
                                        <th>Reason for appointment</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {

                                    !isLoading
                                        ?
                                        <tbody>
                                            {
                                                appointments.map((data, index) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.doctor_name}</td>
                                                            <td>{data.datetime}</td>
                                                           
                                                            <td>{data.description}</td>
                                                            <td>{data.status}</td>
                                                            <td className="text-right">
                                                                <div className="dropdown dropdown-action">
                                                                    <button
                                                                        className="action-icon dropdown-toggle"
                                                                        data-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </button>
                                                                    <div className="btn dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                                                                        {/* <Link
                                                                            className="dropdown-item border-0 btn-transition btn passData"
                                                                            to={'/readings_edit/' + data.id}
                                                                            title="Edit">
                                                                            <i className="fa fa-pencil"></i> Edit
                                                                        </Link> */}
                                                                        <button
                                                                            className="btn dropdown-item border-0 btn-transition btn passData"
                                                                            title="Cancel"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to cancel this appointment?')) {
                                                                                    deletePatient(data.id)
                                                                                };
                                                                            }}>
                                                                            <i className="fa fa-trash"></i> Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
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

export default Appointments;