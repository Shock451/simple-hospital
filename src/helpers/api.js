import { BASE_URL } from './constants';

export const fetchAllStaff = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/users/list', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}


export const deleteStaff = async (id, role) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/users', {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            role: role,
        }),
    });
    const status = res.status;
    // const data = await res.json();
    return {
        status,
        // data ,
    };
}


export const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/users/me', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}


export const fetchPatientList = async (keyword) => {
    const token = localStorage.getItem('token');
    console.log(BASE_URL + '/patients' + (keyword ? `?search=${keyword}` : ''))
    const res = await fetch(BASE_URL + '/patients' + (keyword ? `?search=${keyword}` : ''), {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchMyScanReports = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/scans', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchPatientScanReports = async (patient_id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/doctors/scans/' + patient_id, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchUniquePatient = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/' + id + '/complete', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchUniquePatientByToken = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/me', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

//messages 
export const fetchMessageData = async (id) => {
    const token = localStorage.getItem('token');
    let url;
    if (typeof id === 'undefined') {
        url = BASE_URL + '/chats';
    } else {
        url = BASE_URL + '/chats/' + id;
    }
    console.log(url)
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}
//patient vitals
export const fetchPatientReadings = async (role, id = null) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + (role === 'doctor' ? `/doctors/patients/${id}/readings` : '/patients/readings/me'), {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const putPatientReadings = async (reading, id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/readings/' + id, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(reading)
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchUniquePatientReadings = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/readings/' + id, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const postPatientReadings = async (id, reading) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/readings/' + id, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(reading)
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

//appointments api functions
export const postAppointment = async (appointment) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/appointments/me', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(appointment)
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchDoctorList = async () => {
    const token = localStorage.getItem('token');
    // console.log(BASE_URL + '/doctors' + (keyword ? `?search=${keyword}` : ''))
    const res = await fetch(BASE_URL + '/doctors', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    // console.log(BASE_URL + '/doctors' + (keyword ? `?search=${keyword}` : ''))
    const res = await fetch(BASE_URL + '/appointments/me', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const patchAppointment = async (id, state) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/appointments', {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ id, status: state })
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}


//meds refill functions
export const patchRequest = async (id, state) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/meds-refill', {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ id, status: state })
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    // console.log(BASE_URL + '/doctors' + (keyword ? `?search=${keyword}` : ''))
    const res = await fetch(BASE_URL + '/meds-refill/me', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        }
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}

export const postRequest = async (report) => {
    const formData = new FormData();

    // console.log(report)
    formData.append("file", report["file"][0], "scan");
    formData.append("patient_id", report["patient_id"]);
    formData.append("description", report["description"]);

    const token = localStorage.getItem('token');
    console.log("We are here")
    const res = await fetch(BASE_URL + '/radiology/upload', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}
