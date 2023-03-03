import { storage } from "../helpers/local-storage.helper";

import { BASE_URL } from "../config/app.config";

const getToken = () => {
    const user = storage.getValue('user', null);

    if (user) {
        return `Bearer ${user.token}`
    } else {
        return 'Bearer ';
    }
}

const findAll = async (endpoint: string) => {
    const resp = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getToken()
        }
    });

    return resp.json();
};


const store = async (endpoint: string, data: any) => {
    const resp = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getToken()
        },
        body: JSON.stringify(data)
    });

    return resp.json();
};

const update = async (endpoint: string, data: any) => {
    const resp = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getToken()
        },
        body: JSON.stringify(data)
    });

    return resp.json();
};

const destroy = async (endpoint: string) => {
    const data = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getToken()
        }
    });

    return data;
};



export const api = {
    findAll,
    update,
    delete: destroy,
    store,
}