import React from "react";
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context';

function Sidebar(props) {
    const { appState } = useAppContext();
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">

                    {appState?.user.role === 'patient' ?
                        <ul>
                            <li className={props.data.location.pathname === '/' ? 'active' : ''}>
                                <Link to={'/'}><i className="fa fa-dashboard"></i> <span>Dashboard</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/readings' ? 'active' : props.data.location.pathname === '/readings_add' ? 'active' : props.data.match.path === '/readings_edit/:id' ? 'active' : null}>
                                <Link to={'/readings'}><i className="fa fa-book"></i> <span>Readings</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/patient_message_list' ? 'active' : props.data.match.path === '/patient_message/:id' ? 'active' : ''}>
                                <Link to={'/patient_message_list'}><i className="fa fa-inbox"></i> <span>Message Box</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/appointments' ? 'active' : props.data.match.path === '/schedule_appointment' ? 'active' : ''}>
                                <Link to={'/appointments'}><i className="fa fa-calendar"></i> <span>Appointments</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/scans' ? 'active' : props.data.match.path === '/scans' ? 'active' : ''}>
                                <Link to={'/scans'}><i className="fa fa-medkit"></i> <span>Scan Reports</span></Link>
                            </li>
                        </ul>
                        :
                        null
                    }

                    {appState?.user.role === 'doctor' ?
                        <ul>
                            <li className={props.data.location.pathname === '/doctor_message_list' ? 'active' : props.data.match.path === '/doctor_message/:id' ? 'active' : ''}>
                                <Link to={'/doctor_message_list'}><i className="fa fa-inbox"></i> <span>Message Box</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/patient_list' ? 'active' : props.data.match.path === '/patient_details/:id' ? 'active' : ''}>
                                <Link to={'/patient_list'}><i className="fa fa-users"></i> <span>Patient List</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/appointments' ? 'active' : props.data.match.path === '/schedule_appointment' ? 'active' : ''}>
                                <Link to={'/appointments'}><i className="fa fa-calendar"></i> <span>Appointments</span></Link>
                            </li>
                            <p></p>
                            {/* <li className={props.data.location.pathname === '/scans' ? 'active' : props.data.match.path === '/scans' ? 'active' : ''}>
                                <Link to={'/scans'}><i className="fa fa-medkit"></i> <span>Scan Reports</span></Link>
                            </li> */}
                        </ul>
                        :
                        null
                    }

                    {appState?.user.role === 'radiologist' ?
                        <ul>
                            <li className={props.data.location.pathname === '/radiology' ? 'active' : ''}>
                                <Link to={'/radiology'}><i className="fa fa-dashboard"></i> <span>All scans</span></Link>
                            </li>
                            <p></p>
                            <li className={props.data.location.pathname === '/radiology' ? 'active' : ''}>
                                <Link to={'/radiology'}><i className="fa fa-plus"></i> <span>Upload Radiology Results</span></Link>
                            </li>
                            <p></p>
                        </ul>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;