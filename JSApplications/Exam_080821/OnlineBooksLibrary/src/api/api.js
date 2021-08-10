import { setUserData,getUserData,removeUserData } from "./user.js";

export const settings = {
    host: ''
}

export async function get(url) {
    return await request(url, defineOptions());
}

export async function post(url, data) {
    return await request(url, defineOptions('post', data));
}

export async function put(url, data) {
    return await request(url, defineOptions('put', data));
}

export async function del(url) {
    return await request(url, defineOptions('delete'));
}

export async function login(email, password) {
    const response = await post(settings.host + '/users/login', { email, password });
    setUserData(response);
    return response;
}

export async function register(email, password) {
    const response = await post(settings.host + '/users/register', { email, password });
    setUserData(response);
    return response;
}

//not async => even if request is invalid or server has been restarted, sessionStorage will be cleared
export function logout() {
    const response = get(settings.host + '/users/logout');
    removeUserData();
    return response;
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function defineOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };
    if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }
    const user = getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }
    return options;
}