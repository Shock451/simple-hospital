import React, { useState, useEffect, useRef } from "react";
import { fetchMessageData } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { BASE_URL } from '../helpers/constants';
import { useForm } from "react-hook-form";
import { formatDateTime } from '../helpers/functions';

function DoctorMessage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isMessage, setMessage] = useState("");

    // eslint-disable-next-line
    const { register, handleSubmit, errors } = useForm();

    let id = props.match.params.id;
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
                    const { data } = await fetchMessageData(id);
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
                        {
                            !isLoading
                                ?
                                <div className="col-lg-9 message-view task-view">
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
                                                            {// eslint-disable-next-line eqeqeq
                                                                isData.messages.length > 0
                                                                    ?
                                                                    isData.messages.map(function (data) {
                                                                        return (
                                                                            <div className="chat" key={data.id}>
                                                                                {// eslint-disable-next-line eqeqeq
                                                                                    data.to_id == id && data.message !== ''?
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
                                                            <form onSubmit={handleSubmit(sendMessage)} style={{ width: "100%" }}>
                                                                <div className="form-group row">
                                                                    <div className="col-md-12" style={{ display: "flex" }}>
                                                                        <textarea className="form-control" rows="5" placeholder="Type message..." onChange={(e) => messageUpdate(e.target.value)}></textarea>
                                                                        <span className="input-group-append">
                                                                            <button className="btn btn-custom" type="submit"><i className="fa fa-send"></i></button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
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
        </div >
    )
}

export default DoctorMessage;