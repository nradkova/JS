import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAllMemes() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function getMemeById(id) {
    return await api.get(host + '/data/memes/' + id);
}

export async function delMeme(id) {
    return await api.del(host + '/data/memes/' + id);
}

export async function editMeme(id, meme) {
    return await api.put(host + '/data/memes/' + id, meme);
}

export async function createMeme(meme) {
    return await api.post(host + '/data/memes', meme);
}

export async function getMyMemes() {
    const userId = sessionStorage.getItem('userId');
   return await api.get(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
