import { BASE_URL } from './constants';

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


export const fetchMessageData = async(id) => {
    const token = localStorage.getItem('token');
    let url;
    if (typeof id === 'undefined'){
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

export const fetchPatientReadings = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/readings/me', {
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

export const postPatientReadings = async (reading) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL + '/patients/readings/me', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            blood_pressure: reading.blood_pressure,
            blood_sugar: reading.blood_sugar,
            temperature: reading.temperature,
            heart_rate: reading.heart_rate,
        })
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
        body: JSON.stringify({
            blood_pressure: reading.blood_pressure,
            blood_sugar: reading.blood_sugar,
            temperature: reading.temperature,
            heart_rate: reading.heart_rate,
        })
    });
    const status = res.status;
    const data = await res.json();
    return { status, data };
}