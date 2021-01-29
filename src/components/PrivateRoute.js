import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAuth } from "../Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authToken } = useAuth();

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