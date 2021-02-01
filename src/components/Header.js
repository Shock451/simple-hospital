import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { useAppContext } from '../Context';

function capitalize(str){
    return str[0].toUpperCase() + str.substr(1);
}

function Header(props) {
    const { appState } = useAppContext();

    function onClick(e) {
        e.preventDefault();
    }

    function signOut(e) {
        localStorage.clear();
        return (
            <Redirect to={'/login'} />
        )
    }

    if (!localStorage.getItem('token')){
        return <Redirect to='/login' />
    }

    return (
        <div className="header">
            <div className="header-left">
                <div className="page-title-box d-block">
                    <h3>{capitalize(appState?.user.role + " Panel")}</h3>
                </div>
            </div>

            <Link id="toggle_btn" to="/" onClick={onClick}>
                <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </Link>

            <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars"></i></a>

            <ul className="nav user-menu">
                <li className="nav-item dropdown has-arrow main-drop">
                    <button href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <span className="user-img">
                            <img src="assets/img/profiles/avatar-21.jpg" alt="" />
                            <span className="status online"></span>
                        </span>
                        <span></span>
                    </button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={'/profile'} >My Profile</Link>
                        <Link className="dropdown-item" to={'/'} onClick={signOut}>Logout</Link>
                    </div>
                </li>
            </ul>
            <div className="dropdown mobile-user-menu">
                <Link className="nav-link dropdown-toggle" to={'/'} onClick={(event) => event.preventDefault()} data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></Link>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to={'/profile'} >My Profile</Link>
                    <Link className="dropdown-item" to={'/'} onClick={signOut}>Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;