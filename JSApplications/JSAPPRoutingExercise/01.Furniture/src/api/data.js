import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAllEntries() {
    return await api.get(host + '/data/catalog');
}

export async function getMyEntries() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createEntry(entry) {
    return await api.post(host + '/data/catalog', entry);
}

export async function getEntryById(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function editEntry(id, entry) {
    return await api.put(host + '/data/catalog/' + id, entry);
}

export async function delEntry(id) {
    return await api.del(host + '/data/catalog/' + id);
}
