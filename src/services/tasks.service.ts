
import { api } from "./api.service";

const ENDPOINT = '/tasks';

export const getTasks = async () => {
    const data = await api.findAll(`${ENDPOINT}`);

    return data;
};


export const markAsDone = async (id: string) => {
    const data = await api.update(`${ENDPOINT}/${id}`, { status: 'DONE' });

    return data;
};


export const deleteTask = async (id: string) => {
    const data = await api.delete(`${ENDPOINT}/${id}`);

    return;
};

export const updateTask = async (id: string, data: any) => {
    const resp = await api.update(`${ENDPOINT}/${id}`, data);

    return;
};


export const createTask = async (data: any) => {
    const resp = await api.store(`${ENDPOINT}`, data);

    return;
};