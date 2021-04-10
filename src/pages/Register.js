import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import { useAppContext } from "../Context";
import { useForm } from "react-hook-form";
import * as myConstClass from '../helpers/constants';

function Register(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { setAuthToken } = useAppContext();

    const { register, handleSubmit, errors } = useForm();

    const referer = props.location.state ? props.location.state.referer : '/';

    function postRegister(data) {
        setIsLoading(true);
        let status;
        fetch(myConstClass.BASE_URL + '/users/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                mobile: data.mobile,
                email: data.username,
                password: data.password,
                role: "patient",
            })
        }).then((res) => {
            status = res.status;
            console.log(status);
            return res.json()
        })
            .then((data) => {
                if (status === 200) {
                    setAuthToken(data.token);
                    setLoggedIn(true);
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    setErrorMsg(data.err);
                }
            }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg("Unable to register. Try again after some time.");
                console.log(e);
            });
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <div className="account-page">
            {
                localStorage.getItem('tokens') ? <Redirect to='/' /> : ''
            }
            {
                isLoading ?
                    <div className="gif-loader">
                        <img src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif" alt="Loading" />
                    </div>
                    : null
            }
            <div className="main-wrapper">
                <div className="account-content">
                    <div className="container">
                        <div className="account-logo">
                            <img src={logo} width="100" alt="Health Monitoring System Logo" />
                        </div>
                        <div className="account-box">
                            <div className="account-wrapper">
                                <h3 className="account-title">Register</h3>

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

                                <form onSubmit={handleSubmit(postRegister)}>
                                    <div className="form-group">
                                        <label>Name <em>*</em></label>
                                        <input ref={register({ required: "This field is required" })} className="form-control" name="name" />
                                        {errors.name && <label className="error">{errors.name.message}</label>}
                                    </div>

                                    <div className="form-group">
                                        <label>Mobile <em>*</em></label>
                                        <input ref={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[0-9]*$/i,
                                                message: "Please enter valid mobile number"
                                            }
                                        })} className="form-control" name="mobile" />
                                        {errors.mobile && <label className="error">{errors.mobile.message}</label>}
                                    </div>

                                    <div className="form-group">
                                        <label>Email <em>*</em></label>
                                        <input ref={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Please enter valid email address"
                                            }
                                        })} className="form-control" name="username" type="username" placeholder="Email Address" />
                                        {errors.username && <label className="error">{errors.username.message}</label>}
                                    </div>

                                    <div className="form-group">
                                        <label>Password <em>*</em></label>
                                        <input ref={register({ required: "This field is required" })} className="form-control" name="password" type="password" placeholder="password" />
                                        {errors.password && <label className="error">{errors.password.message}</label>}
                                    </div>
                                    {/* <div className="form-group">
                                        <label>You are ?</label>
                                        <select ref={register} className="form-control" name="role">
                                            <option value="doctor">Doctor</option>
                                            <option value="patient">Patient</option>
                                            <option value="radiologist">Radiologist</option>
                                        </select>
                                    </div> */}
                                    <div className="form-group text-center">
                                        <button className="btn btn-primary account-btn" type="submit" >Register</button>
                                    </div>
                                    <div className="account-footer">
                                        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;