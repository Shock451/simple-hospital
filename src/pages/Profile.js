import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from '../helpers/constants';
import { fetchUserDetails } from '../helpers/api';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { useAppContext } from "../Context";
import { formatDate, formatDateTime, convertDate } from "../helpers/functions";

function Profile(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const { appState } = useAppContext();

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchUserDetails();
            setData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const { register, handleSubmit, errors, watch } = useForm();

    async function updateProfile(changes) {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL + '/users/me', {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(changes)
        }).catch(e => {
            setIsLoading(false);
            setIsError(true);
            setErrorMsg("Unable to update. Try again after some time.");
            console.log(e);
        });

        if (res && res.status) {
            const data = await res.json();
            if (res.status === 200) {
                setIsSuccess(true);
                setIsLoading(false);
                setIsError(false);
                setErrorMsg('');
                setSuccessMsg(data.msg);
            } else {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg(data.err);
                setSuccessMsg('');
            }
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
            <Header data={props} />
            <Sidebar data={props} />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Profile</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">User Info</h4>
                                </div>
                                <div className="card-body">
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
                                        isSuccess
                                            ?
                                            <div className="alert alert-success alert-dismissible" role="alert">
                                                <button type="button" className="close" data-dismiss="alert">
                                                </button>
                                                {successMsg}
                                            </div>
                                            :
                                            null
                                    }
                                    <form onSubmit={handleSubmit(updateProfile)}>
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <div className="form-group row">
                                                    <div className="col-sm-4">
                                                        <label>Name <em>*</em></label>
                                                        <input ref={register({ required: "This field is required" })} className="form-control" name="name" defaultValue={!isLoading ? isData.data.name : ''} />
                                                        {errors.name && <label className="error">{errors.name.message}</label>}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label>Mobile <em>*</em></label>
                                                        <input ref={register({
                                                            required: "This field is required",
                                                            pattern: {
                                                                value: /^[0-9]*$/i,
                                                                message: "Please enter valid mobile number"
                                                            },
                                                        })} className="form-control" name="mobile" defaultValue={!isLoading ? isData.data.mobile : ''} />
                                                        {errors.mobile && <label className="error">{errors.mobile.message}</label>}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label>Email <em>*</em></label>
                                                        <input ref={register({
                                                            required: "This field is required",
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Please enter valid email address"
                                                            }
                                                        })} className="form-control" name="email" type="email" placeholder="Email Address" defaultValue={!isLoading ? isData.data.email : ''} />
                                                        {errors.email && <label className="error">{errors.email.message}</label>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-6">
                                                        <label>Gender</label>
                                                        <select ref={register} className="form-control" name="gender" defaultValue={!isLoading ? isData.data.gender : ''}>
                                                            {/* <option value="">Doctor</option> */}
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label>Address</label>
                                                        <textarea ref={register} className="form-control" name="address" defaultValue={!isLoading ? isData.data.address : ''}></textarea>
                                                    </div>
                                                    {appState.user?.role === "patient" &&
                                                        <div className="col-sm-6">
                                                            <label>Allergies</label>
                                                            <textarea ref={register} className="form-control" name="allergies" defaultValue={!isLoading ? isData.data.allergies : ''}></textarea>
                                                        </div>
                                                    }
                                                    <div className="col-sm-6">
                                                        <label>Description</label>
                                                        <textarea ref={register} className="form-control" name="description" defaultValue={!isLoading ? isData.data.description : ''}></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    {appState.user?.role === "doctor" ?
                                                        <div className="col-sm-4">
                                                            <label>License</label>
                                                            <input ref={register} className="form-control" name="license_num" defaultValue={!isLoading ? isData.data.license_num : ''} />
                                                        </div>
                                                        :
                                                        <div className="col-sm-4">
                                                            <label>Date of Birth</label>
                                                            <input ref={register({
                                                                required: "This field is required",
                                                            })} className="form-control" name="dob" type="date" defaultValue={!isLoading ? convertDate(isData.data.dob) : ''} min="" max="" />
                                                        </div>
                                                    }
                                                    <div className="col-sm-4">
                                                        <label>City</label>
                                                        <input ref={register} className="form-control" name="city" defaultValue={!isLoading ? isData.data.city : ''} />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label>State</label>
                                                        <input ref={register} className="form-control" name="state" defaultValue={!isLoading ? isData.data.state : ''} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title"><i className="icon-office"></i>Change Password</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <label>Old Password </label>
                                                                <input ref={register} type="password" className="form-control" name="old_password" id="old-password" />
                                                                <span className="help-block">Leave blank if you don't want to change password</span>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label>New Password </label>
                                                                <input ref={register} type="password" className="form-control" name="password" id="password" />

                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label>Retype New Password </label>
                                                                <input ref={register({
                                                                    validate: (value) => {
                                                                        return value === watch('password') || "Passwords don't match."
                                                                    }
                                                                })} type="password" className="form-control" name="password2" id="password2" />
                                                                {errors.password2 && <label className="error">{errors.password2.message}</label>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions text-right">
                                                <button type="submit" name="update" id="update" className="btn btn-danger"><i className="icon-signup"></i>Update Profile</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile;