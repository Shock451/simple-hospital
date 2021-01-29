import { BASE_URL } from './constants';

export const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/users/me', {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        }
    });
    const body = await res.json();
    return body;
}

export const fetchPatientList = async (keyword) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/getPatientList.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token, search: keyword }),
    });
    const body = await res.json();
    return body;
}

export const fetchUniquePatient = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/getUniquePatient.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token, id: id }),
    });
    const body = await res.json();
    return body;
}

export const fetchUniquePatientByToken = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/getUniquePatientByToken.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    });
    const body = await res.json();
    return body;
}


export const fetchDoctorMessageData = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/getDcotorMessageData.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token, id: id }),
    });
    const body = await res.json();
    return body;
}

export const fetchPatientMessageData = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/getPatientMessageData.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token, id: id }),
    });
    const body = await res.json();
    return body;
}

export const fetchPatientReadings = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/fetchPatientReadings.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    });
    const body = await res.json();
    return body;
}
export const fetchUniquePatientReadings = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/fetchUniquePatientReadings.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token: token, id: id }),
    });
    const body = await res.json();
    return body;
}