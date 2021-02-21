import React from "react";
import logo from '../logo.svg';

function Loader(props) {

    return (
        <div id="loader-wrapper">
            <div className="loader">
                <img src={logo} alt="EHR Web App Logo" />
                <h2>Loading...</h2>
            </div>
        </div>
    )
}

export default Loader;