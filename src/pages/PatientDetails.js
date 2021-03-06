import React, { useState, useEffect } from "react";
import { fetchUniquePatient, fetchPatientReadings, fetchPatientScanReports } from '../helpers/api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { Bar } from 'react-chartjs-2';
import { createChartData, convertDate, calculateBMI } from '../helpers/functions';
import { BASE_URL } from '../helpers/constants';

function PatientDetails(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isChartData, setChartData] = useState();
    const [reports, setReports] = useState([]);

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const id = props.match.params.id;

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const { data } = await fetchUniquePatient(id);
            const { data: reportData } = await fetchPatientScanReports(id);
            setData(data);
            setReports(reportData);
            setChartData(createChartData(data.readings))
            setIsLoading(false);
        }

        fetchData();

    }, []);

    function deletePatient(reading_id) {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        let status;
        fetch(BASE_URL + '/patients/readings/' + reading_id, {
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
                        pathname: "/patient_details" + id,
                        state: {
                            success: "Reading deleted successfully"
                        }
                    });
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
                                <h3 className="page-title">Patient</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/patient_list'}>Patient List</Link></li>
                                    <li className="breadcrumb-item active">Patient Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {!isLoading ?
                                        <div className="profile-view">
                                            <div className="profile-basic">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="profile-info-left">
                                                            <h3 className="user-name m-t-0">{isData.user.name}</h3>
                                                            <h5 className="company-role m-t-0 mb-0">{isData.user.type}</h5>
                                                            <div className="staff-id">{isData.patient !== null ? isData.patient.description : ''}</div>
                                                            <div className="staff-msg"><Link to={'/doctor_message/' + isData.user.id} className="btn btn-custom">Send Message</Link></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <ul className="personal-info">
                                                            <li>
                                                                <span className="title">Phone:</span>
                                                                <span className="text"><a href={'tel:' + isData.user.mobile}>{isData.user.mobile}</a></span>
                                                            </li>
                                                            <li>
                                                                <span className="title">Email:</span>
                                                                <span className="text"><a href={'mailto:' + isData.user.email}>{isData.user.email}</a></span>
                                                            </li>
                                                            <li>
                                                                <span className="title">Address:</span>
                                                                <span className="text-dark">{isData.patient.address ?? 'Nil'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="title">City:</span>
                                                                <span className="text-dark">{isData.patient.city ?? 'Nil'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="title">State:</span>
                                                                <span className="text-dark">{isData.patient.state ?? 'Nil'}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-md-12">
                                            <h4>Loading...</h4>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Readings</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Readings</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <Link to={'/readings_add/' + id} className="btn add-btn"><i className="fa fa-plus"></i> Add New Readings</Link>
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
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Blood Sugar</th>
                                        <th>Blood Pressure</th>
                                        <th>Heart Rate</th>
                                        <th>Temperature</th>
                                        <th>BMI</th>
                                        <th>No. Drugs</th>
                                        <th>Prescription</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {

                                    !isLoading
                                        ?
                                        <tbody>
                                            {
                                                isData.readings.map(function (data, index) {
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
                                                            <td className="text-right">
                                                                <div className="dropdown dropdown-action">
                                                                    <button
                                                                        className="action-icon dropdown-toggle"
                                                                        data-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </button>
                                                                    <div className="btn dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                                                                        <Link
                                                                            className="dropdown-item border-0 btn-transition btn passData"
                                                                            to={`/readings_edit/${id}/${data.id}`}
                                                                            title="Edit">
                                                                            <i className="fa fa-pencil"></i> Edit
                                                                        </Link>
                                                                        <button
                                                                            className="btn dropdown-item border-0 btn-transition btn passData"
                                                                            title="Delete"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to delete this?')) {
                                                                                    deletePatient(data.id)
                                                                                };
                                                                            }}>
                                                                            <i className="fa fa-trash"></i> Delete
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

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Patients Readings</h3>
                                    {!isLoading ?
                                        isChartData.length !== 0 ?
                                            <Bar data={isChartData} />
                                            :
                                            null
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-12">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                    </tr>
                                </thead>
                                {

                                    !isLoading
                                        ?
                                        <tbody>
                                            {
                                                reports.map(function (data, index) {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.report}</td>
                                                            <td>
                                                                <a target="_blank" href={`${data.image_uri}`}>
                                                                    View Image
                                                                </a>
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
        </div>
    )
}

export default PatientDetails;