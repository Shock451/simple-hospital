import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAppContext } from "../Context";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authToken, appState } = useAppContext();

    let role = appState?.user?.role;
    
    if (typeof role === 'undefined') {
        role = null;
    }
    console.log(role)
    if (role && rest.role && role !== rest.role) {
        return <Redirect to="/" />;
    }

    return (
        <Route
            {...rest}
            render={props =>
                authToken ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
                    )
            }
        />
    );
}

export default PrivateRoute