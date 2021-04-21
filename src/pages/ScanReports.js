import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { fetchMyScanReports } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
// import { BASE_URL } from '../helpers/constants';
// import { convertDate, calculateBMI } from '../helpers/functions';

function ScanReports(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function fetchData() {
        setIsLoading(true);
        const { data } = await fetchMyScanReports();
        setReports(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // function deletePatient(id) {
    //     setIsLoading(true);
    //     const token = localStorage.getItem('token');
    //     let status;
    //     fetch(BASE_URL + '/patients/readings/' + id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': "application/json",
    //             'Accept': 'application/json',
    //         }
    //     }).then((response) => {
    //         status = response.status;
    //         return response.json();
    //     })
    //         .then((result) => {
    //             if (status) {
    //                 setIsLoading(false);
    //                 props.history.push({
    //                     pathname: "/readings",
    //                     state: {
    //                         success: "Reading deleted successfully"
    //                     }
    //                 });
    //                 fetchData();
    //             } else {
    //                 setIsLoading(false);
    //                 setIsError(true);
    //                 setErrorMsg(result.message);
    //             }
    //         }).catch(e => {
    //             setIsLoading(false);
    //             setIsError(true);
    //             setErrorMsg("Not able to connect with API try again after sometime.");
    //             console.log(e);
    //         });
    // }

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
                                <h3 className="page-title">Reports</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Reports</li>
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
                                        {/* {} */}
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
        </div >
    )
}

export default ScanReports;