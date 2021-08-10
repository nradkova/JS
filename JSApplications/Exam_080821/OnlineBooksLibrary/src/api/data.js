import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAll() {
    return await api.get(host + '/data/books?sortBy=_createdOn%20desc');
}

export async function getOneById(id) {
    return await api.get(host + '/data/books/' + id);
}

export async function delOne(id) {
    return await api.del(host + '/data/books/' + id);
}

export async function editOne(id, one) {
    return await api.put(host + '/data/books/' + id, one);
}

export async function createOne(one) {
    return await api.post(host + '/data/books', one);
}

export async function getMy(userId) {
    return await api.get(host + `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function postLike(bookId) {
    return await api.post(host + '/data/likes', { bookId });
}

export async function getLikes(bookId) {
    return await api.get(host + `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function checkUserLiked(bookId, userId) {
    if (userId == null) {
        return false;
    }
    let response = await api.get(host + `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return !Boolean(response)
}

