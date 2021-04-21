import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';

import { useAppContext } from "../../Context";
import { useForm } from "react-hook-form";
import * as myConstClass from '../../helpers/constants';

import Header from '../../components/AdminHeader';

function CreateStaff(props) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { setAuthToken } = useAppContext();

    const { register, handleSubmit, errors } = useForm();

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
                role: data.role,
            })
        }).then((res) => {
            status = res.status;
            console.log(status);
            return res.json()
        })
            .then((data) => {
                if (status === 200) {
                    window.location.href = "/";
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

    return (
        <div>
            <Header data={props} />
            <div className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6 mx-auto">
                            <p className="lead">Create a new staff account</p>
                            <form className="auth-form mt-4" onSubmit={handleSubmit(postRegister)}>
                                <div className="form-group">
                                    <label>Full Name <em>*</em></label>
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
                                <div className="form-group">
                                    <label>Staff Role</label>
                                    <select ref={register} className="form-control" name="role">
                                        <option value="doctor">Doctor</option>
                                        <option value="radiographer">Radiographer</option>
                                    </select>
                                </div>
                                <div className="form-group text-center mt-5">
                                    <button className="btn btn-primary account-btn" type="submit" >Create account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStaff;