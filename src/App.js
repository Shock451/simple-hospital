import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

import { fetchUserDetails } from './helpers/api';

import { AppContext } from "./Context";
import Loader from './components/Loader';

function App(props) {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");
    // eslint-disable-next-line
    const [appState, setAppState] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const { data } = await fetchUserDetails();
            setAppState({ user: data });
            setLoading(false);
        }
        if (authToken) {
            fetchData();
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
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/patient_list" component={PatientList} />
                <PrivateRoute path="/patient_details/:id" component={PatientDetails} />
                <PrivateRoute path="/doctor_message/:id" component={DoctorMessage} />
                <PrivateRoute path="/doctor_message_list" component={DoctorMessageList} />
                <PrivateRoute path="/readings" component={Readings} />
                <PrivateRoute path="/readings_add" component={ReadingsAdd} />
                <PrivateRoute path="/readings_edit/:id" component={ReadingsEdit} />
                <PrivateRoute path="/patient_message_list" component={PatientMessageList} />
                <PrivateRoute path="/patient_message/:id" component={PatientMessage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forgotpassword" component={ForgotPassword} />
            </Router>
        </AppContext.Provider>
    );
}

export default App;
