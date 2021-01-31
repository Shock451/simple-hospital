import React, { useState, useEffect, useRef } from "react";
// import { Link } from 'react-router-dom';
import { fetchMessageData } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { BASE_URL } from '../helpers/constants';
import { formatDateTime } from '../helpers/functions';

function PatientMessage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isMessage, setMessage] = useState("");
    const id = props.match.params.id;

    const messagesEndRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        const intervalId = setInterval(() => {
            async function fetchData() {
                const { data } = await fetchMessageData(id);
                setData(data);
                setIsLoading(false);
                if (isLoading) {
                    function scrollToBottom() {
                        if (messagesEndRef.current) {
                            messagesEndRef && messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
                        }
                    }
                    scrollToBottom();
                }
            }
            fetchData();
        }, 3000);
        // eslint-disable-next-line
        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function sendMessage() {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL + '/chats/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                message: isMessage,
                to_id: id,
            })
        }).catch(e => {
            setIsLoading(false);
        });

        if (res && res.status) {
            if (res.status === 200) {
                async function fetchData() {
                    const {data} = await fetchMessageData(id);
                    setData(data);
                    setIsLoading(false);
                }
                fetchData();
            } else {
                setIsLoading(false);
            }
        }
    }


    function messageUpdate(value) {
        setMessage(value);
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

            <div className="page-wrapper" style={{ minHeight: window.innerHeight + 'px', }}>
                <div className="chat-main-row">
                    <div className="chat-main-wrapper">
                        <div className="col-lg-9 message-view task-view">
                            {!isLoading ?
                                <div className="chat-window">
                                    <div className="fixed-header">
                                        <div className="navbar">
                                            <div className="user-details mr-auto">
                                                <div className="user-info float-left">
                                                    <span>{isData.recipientDetails.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-contents">
                                        <div className="chat-content-wrap">
                                            <div className="chat-wrap-inner">
                                                <div className="chat-box">
                                                    <div className="chats" id="scrollChat">
                                                        {
                                                            isData.messages.length > 0 ?
                                                                isData.messages.map(data => {
                                                                    return (
                                                                        <div className="chat" key={data.id}>
                                                                            {// eslint-disable-next-line eqeqeq
                                                                             data.to_id == id && data.message !== '' ?
                                                                            <div className="chat chat-right">
                                                                                    <div className="chat-body">
                                                                                        <div className="chat-bubble">
                                                                                            <div className="chat-content">
                                                                                                <p>{data.message}</p>
                                                                                                <span className="chat-time">{formatDateTime(data.created)}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div className="chat chat-left">
                                                                                    <div className="chat-body">
                                                                                        <div className="chat-bubble">
                                                                                            <div className="chat-content">
                                                                                                <p>{data.message}</p>
                                                                                                <span className="chat-time">{formatDateTime(data.created)}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                                :
                                                                <h4>Start chat by sending the first message.</h4>
                                                        }
                                                    </div>
                                                    <div ref={messagesEndRef} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-footer">
                                        <div className="message-bar">
                                            <div className="message-inner">
                                                <div className="message-area">
                                                    <div className="input-group">
                                                        <textarea className="form-control" rows="5" placeholder="Type message..." onChange={(e) => messageUpdate(e.target.value)}></textarea>
                                                        <span className="input-group-append">
                                                            <button className="btn btn-custom" type="button" onClick={() => sendMessage()}><i className="fa fa-send"></i></button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <h5>Loading...</h5>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PatientMessage;