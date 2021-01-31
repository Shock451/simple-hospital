import React, { useState, useEffect } from "react";
import { fetchUniquePatient } from '../helpers/api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { Bar } from 'react-chartjs-2';
import { createChartData } from '../helpers/functions';

function PatientDetails(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isChartData, setChartData] = useState();
    const id = props.match.params.id;

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const { data } = await fetchUniquePatient(id);
            setData(data);
            setChartData(createChartData(data.readings))
            setIsLoading(false);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

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
                                                                <span className="text-dark">{isData.patient.address?? 'Nil'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="title">City:</span>
                                                                <span className="text-dark">{isData.patient.city?? 'Nil'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="title">State:</span>
                                                                <span className="text-dark">{isData.patient.state?? 'Nil'}</span>
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
                </div>
            </div>
        </div >
    )
}

export default PatientDetails;