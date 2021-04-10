import React, { useState, useEffect } from "react";
import { fetchPatientReadings } from '../helpers/api';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { Bar } from 'react-chartjs-2';
import { useAppContext } from '../Context';
import { createChartData } from '../helpers/functions';

function Home(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isChartData, setChartData] = useState([]);
    const { appState } = useAppContext();

    useEffect(() => {
        if (!appState) return;
        
        async function fetchData() {
            setIsLoading(true);
            const { status, data } = await fetchPatientReadings("patient");
            if (status === 200) {
                let newChartData = createChartData(data);
                setChartData(newChartData);
            }
            setIsLoading(false);
        }

        if (appState.user.role === 'patient') {
            fetchData();
        }
    }, [appState]);

    if (!isLoading && appState) {
        if (appState.user.role === 'doctor') {
            return <Redirect to={'/patient_list'} />;
        } else if (appState.user.role === 'radiologist') {
            return <Redirect to={'/radiology'} />;
        } else if (appState.user.role === 'admin') {
            return <Redirect to={'/admin'} />;
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

            <Header />
            <Sidebar data={props} />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Dashboard</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Readings Details</li>
                                </ul>
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
                                                <h4>No Record Found...</h4>
                                            :
                                            <h4>No Record Found...</h4>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;