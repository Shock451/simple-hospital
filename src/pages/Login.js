import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import { useAppContext } from "../Context";
import { useForm } from "react-hook-form";
import { BASE_URL } from '../helpers/constants';

function Login(props) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { setAuthToken } = useAppContext();

    const { register, handleSubmit, errors } = useForm();

    const referer = props.location.state ? props.location.state.referer : '/';

    async function postLogin(data) {
        setIsLoading(true);
        const res = await fetch(BASE_URL + '/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.username,
                password: data.password,
                // role: data.role,
            })
        }).catch(e => {
            setIsLoading(false);
            setIsError(true);
            setErrorMsg("Unable to login, username or password is wrong");
            console.log(e);
        });
        if (res && res.status) {
            const data = await res.json();
            if (res.status === 200) {
                setAuthToken(data.token);
                setLoggedIn(true);
            } else {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg(data.err);
            }
        }
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <div className="account-page">
            {
                localStorage.getItem('token') ? <Redirect to='/' /> : ''
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
                                <h3 className="account-title">Login</h3>

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

                                {
                                    props.location.state ?
                                        props.location.state.pass ?
                                            <div className="alert alert-success alert-dismissible" role="alert">
                                                <button type="button" className="close" data-dismiss="alert"></button>
                                                Your new password is {props.location.state.pass}
                                            </div>
                                            :
                                            null
                                        :
                                        null
                                }

                                <form onSubmit={handleSubmit(postLogin)}>
                                    <div className="form-group">
                                        <label>Email Address</label>
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
                                        <div className="row">
                                            <div className="col">
                                                <label>Password</label>
                                            </div>
                                            <div className="col-auto">
                                                <Link className="text-muted" to={'/forgotpassword'}>Forgot password?</Link>
                                            </div>
                                        </div>
                                        <input ref={register({ required: "This field is required" })} className="form-control" name="password" type="password" placeholder="password" />
                                        {errors.password && <label className="error">{errors.password.message}</label>}
                                    </div>
                                    {/* <div className="form-group">
                                        <label>Login as:</label>
                                        <select ref={register} className="form-control" name="role">
                                            <option value="doctor">Doctor</option>
                                            <option value="patient">Patient</option>
                                        </select>
                                    </div> */}
                                    <div className="form-group text-center">
                                        <button className="btn btn-primary account-btn" type="submit" >Sign In</button>
                                    </div>
                                    <div className="account-footer">
                                        <p>Don't have an account yet? <Link to={'/register'}>Register Now</Link></p>
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

export default Login;