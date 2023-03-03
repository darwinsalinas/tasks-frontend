
import { api } from "./api.service";

const ENDPOINT = '/users';

export const getUsers = async () => {
    const data = await api.findAll(`${ENDPOINT}`);

    return data;
};