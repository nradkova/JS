import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAllTeams() {
    const teams = await api.get(host + '/data/teams');
    const members = await getMembers(teams.map(t => t._id));
    teams.forEach(t => t.membersCount = members.filter(x => x.teamId == t._id).length);
    return teams;
}

export async function getMyTeams() {
    const userId = sessionStorage.getItem('userId');
    const data = await api.get(host + `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
    const teams = data.map(d => d.team);
    const members = await getMembers(teams.map(t => t._id));
    teams.forEach(t => t.membersCount = members.filter(x => x.teamId == t._id).length);
    return teams;
}

export async function createTeam(team) {
   const data= await api.post(host + '/data/teams', team);
   const request= await joinTeam(data._id);
   request.status='member';
   await approveMember(request._id,request);
   return data;
}

export async function getTeamById(id) {
    return await api.get(host + '/data/teams/' + id);
}

export async function editTeam(id, team) {
    return await api.put(host + '/data/teams/' + id, team);
}

export async function delTeam(id) {
    return await api.del(host + '/data/teams/' + id);
}

export async function joinTeam(teamId) {
    return await api.post(host + '/data/members', { teamId });
}

export async function approveMember(id, request) {
    return await api.put(host + '/data/members/' + id, request);
}

export async function removeMemberByRequest(requestId) {
    return await api.del(host + '/data/members/' + requestId);
}

export async function getMembers(teamIdArr) {
    const query = encodeURIComponent(`teamId IN ("${teamIdArr.join('", "')}") AND status="member"`);
    return await api.get(host + `/data/members?where=${query}`);
}

export async function getRequestsByTeam(teamId) {
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}