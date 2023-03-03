import { BASE_URL } from "../config/app.config";
import { LoginFormDTO } from "../interfaces/login-form.dto";

const ENDPOINT = '/auth/login';


export const login = async ({ email, password }: LoginFormDTO) => {
    const data = await fetch(`${BASE_URL}${ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    return data.json();
};