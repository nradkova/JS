import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAll() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}

export async function getOneById(id) {
    return await api.get(host + '/data/cars/' + id);
}

export async function delOne(id) {
    return await api.del(host + '/data/cars/' + id);
}

export async function editOne(id, one) {
    return await api.put(host + '/data/cars/' + id, one);
}

export async function createOne(one) {
    return await api.post(host + '/data/cars', one);
}

export async function getMy() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function mySearch(query) {
    return await api.get(host + `/data/cars?where=year%3D${query}`);
}
