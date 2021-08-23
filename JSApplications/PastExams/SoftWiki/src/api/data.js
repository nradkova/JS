import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAll() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}

export async function getRecentArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getOneById(id) {
    return await api.get(host + '/data/wiki/' + id);
}

export async function delOne(id) {
    return await api.del(host + '/data/wiki/' + id);
}

export async function editOne(id, one) {
    return await api.put(host + '/data/wiki/' + id, one);
}

export async function createOne(one) {
    return await api.post(host + '/data/wiki', one);
}

export async function mySearch(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}
