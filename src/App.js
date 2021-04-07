import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import PatientList from "./pages/PatientList";
import PatientDetails from "./pages/PatientDetails";
import DoctorMessage from "./pages/DoctorMessage";
import DoctorMessageList from "./pages/DoctorMessageList";
import Readings from "./pages/Readings";
import ReadingsAdd from "./pages/ReadingsAdd";
import ReadingsEdit from "./pages/ReadingsEdit";
import PatientMessageList from "./pages/PatientMessageList";
import PatientMessage from "./pages/PatientMessage";
// import MedsRefill from "./pages/MedsRefill";
import ScheduleAppointment from "./pages/ScheduleAppointment.js";
import { fetchUserDetails } from './helpers/api';
import Appointments from './pages/Appointments';
import ScanReports from './pages/ScanReports';
import RadiologyForm from './pages/RadiologyForm';

import { AppContext } from "./Context";
import Loader from './components/Loader';
// import MedsRefillRequest from "./pages/MedsRefillRequest";

function App(props) {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");
    // eslint-disable-next-line
    const [appState, setAppState] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    useEffect(() => {
        async function fetchData() {
            const { data } = await fetchUserDetails();
            setAppState({ user: data });
            setLoading(false);
        }
        if (authToken) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [authToken]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AppContext.Provider value={{
            authToken,
            setAuthToken: setToken,
            appState,
            setAppState
        }}>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/profile" component={Profile} />
                    
                    <PrivateRoute role="radiologist" path="/radiology" component={RadiologyForm} />
                    
                    <PrivateRoute role="doctor" path="/patient_list" component={PatientList} />
                    
                    <PrivateRoute role="doctor" path="/patient_details/:id" component={PatientDetails} />
                    
                    <PrivateRoute role="doctor" path="/doctor_message/:id" component={DoctorMessage} />
                    <PrivateRoute role="doctor" path="/doctor_message_list" component={DoctorMessageList} />
                    
                    <PrivateRoute role="patient" path="/readings" component={Readings} />
                    <PrivateRoute role="doctor" path="/readings_add/:id" component={ReadingsAdd} />
                    <PrivateRoute role="doctor" path="/readings_edit/:id/:reading_id" component={ReadingsEdit} />
                    <PrivateRoute role="patient" path="/patient_message_list" component={PatientMessageList} />
                    <PrivateRoute role="patient" path="/patient_message/:id" component={PatientMessage} />
                    <PrivateRoute path="/schedule_appointment" component={ScheduleAppointment} />
                    <PrivateRoute path="/appointments" component={Appointments} />
                    <PrivateRoute path="/scans" component={ScanReports} />
                    
                    {/* <PrivateRoute path="/medsrefillrequest" component={MedsRefillRequest} /> */}
                    
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgotpassword" component={ForgotPassword} />

                    <Redirect to="/" />
                </Switch>
            </Router>
        </AppContext.Provider>);
}

export default App;