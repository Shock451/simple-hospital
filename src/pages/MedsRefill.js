import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchRequests, patchRequest } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { BASE_URL } from '../helpers/constants';
import { useAppContext } from "../Context";
import { formatDateTime } from "../helpers/functions";
import { capitalize } from '../helpers/functions';

function MedsRefill(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [medsrefill, setRequest] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { appState } = useAppContext();
    const role = appState.user.role;

    async function fetchData() {
        setIsLoading(true);
        const { data } = await fetchRequests();
        setRequest(data.appointments);
        setIsLoading(false);
    }

    function deleteRequest(id) {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        let status;
        fetch(BASE_URL + '/meds-refill/' + id, {
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
                        pathname: "/meds-refill",
                        state: {
                            success: "Request deleted successfully"
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

    const changeRequestState = async (id, state) => {
        setIsLoading(true);
        const { status, data } = await patchRequest(id, state);
        if (status === 200) {
            const updatedRequests = medsrefill.map(medsrefill => {
                if (medsrefill.id === id) {
                    medsrefill.status = state;
                }
                return medsrefill;
            });
            setRequest(updatedRequests);
        } else {
            setIsLoading(false);
            setIsError(true);
            setErrorMsg(data.err);
        }
        setIsLoading(false);
    }




    useEffect(() => {
        fetchData();
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
                                <h3 className="page-title">Meds Requests</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Meds Requests</li>
                                </ul>
                            </div>
                            {role === 'patient' &&
                                <div className="col-auto float-right ml-auto">
                                    <Link to={'/medsrefillrequest'} className="btn add-btn"><i className="fa fa-plus"></i> Request Meds</Link>
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
                                        <th>{`Name of ${role === 'doctor' ? 'patient' : "doctor"}`}</th>
                                        <th>Date and Time</th>
                                        <th>Reason for request</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {

                                    !isLoading
                                        ?
                                        <tbody>
                                            { //JSX begins
                                                medsrefill.map((data, index) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.name}</td>
                                                            <td>{formatDateTime(data.date)}</td>
                                                            <td>{data.description}</td>
                                                            <td>{capitalize(data.status)}</td>
                                                            <td className="text-right">
                                                                <div className="dropdown dropdown-action">
                                                                    <button
                                                                        className="action-icon dropdown-toggle"
                                                                        data-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </button>

                                                                    <div className="btn dropdown-menu dropdown-menu-right" x-placement="bottom-end">

                                                                        {role === 'doctor' ?
                                                                            <>
                                                                                <button
                                                                                    className="btn dropdown-item border-0 btn-transition btn passData"
                                                                                    title="Approve"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to approve this request?')) {
                                                                                            changeRequestState(data.id, "approved");
                                                                                        };
                                                                                    }}>
                                                                                    <i className="fa fa-check"></i> Approve
                                                                        </button>

                                                                                <button
                                                                                    className="btn dropdown-item border-0 btn-transition btn passData"
                                                                                    title="Reject"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to reject this request?')) {
                                                                                            changeRequestState(data.id, "rejected");
                                                                                        };
                                                                                    }}>
                                                                                    <i className="fa fa-times"></i> Reject
                                                                        </button>
                                                                            </>

                                                                            :

                                                                            <button
                                                                                className="btn dropdown-item border-0 btn-transition btn passData"
                                                                                title="Cancel"
                                                                                onClick={() => {
                                                                                    if (window.confirm('Are you sure you want to cancel this request?')) {
                                                                                        deleteRequest(data.id)
                                                                                    };
                                                                                }}>
                                                                                <i className="fa fa-trash"></i> Cancel
                                                                        </button>

                                                                        }
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

export default MedsRefill;