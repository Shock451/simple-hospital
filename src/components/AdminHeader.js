import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAppContext } from '../Context';
import logo from '../logo.svg';

export default function AdminHeader(props) {

    // const { appState } = useAppContext();

    function signOut(e) {
        e.preventDefault();        
        localStorage.clear();
        return (
            <Redirect to={'/login'} />
        )
    }

    function getClassName(path){
        let current = props.data.location.pathname;
        if (current === path || current === path + "/"){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark header-admin">
            <a className="navbar-brand" href="/admin">Doctor-Patient Portal</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={getClassName("/admin")}>
                        <a className="nav-link" href="/admin">Staff List <span className="sr-only">(current)</span></a>
                    </li>
                    <li className={getClassName("/admin/create")}>
                        <a className="nav-link" href="/admin/create">Add Staff</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/" onClick={signOut}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}