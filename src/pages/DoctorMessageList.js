import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchMessageData } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';

function DoctorMessageList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const { data } = await fetchMessageData();
            setData(data);
            setIsLoading(false);
        }
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

            <div className="page-wrapper" style={{ minHeight: window.innerHeight + 'px', }}>
                <div className="chat-main-row">
                    <div className="chat-main-wrapper">
                        <div className="col-lg-3 message-view chat-profile-view chat-sidebar" id="task_window">
                            <div className="roles-menu">
                                {
                                    !isLoading
                                        ?
                                        isData.contactList.length > 0
                                            ?
                                            <ul>
                                                {
                                                    isData.contactList.map(function (data) {
                                                        return (
                                                            <li key={data.id}>
                                                                <Link to={'/doctor_message/' + data.id}>{data.name}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            :
                                            <li><h5>No record found...</h5></li>
                                        :
                                        <h5>Loading...</h5>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DoctorMessageList;