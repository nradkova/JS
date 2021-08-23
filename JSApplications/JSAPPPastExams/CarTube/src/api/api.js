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

export async function login(username, password) {
    const response = await post(settings.host + '/users/login', { username, password });
    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('username',response.username);
    return response;
}

export async function register(username,password) {
    const response = await post(settings.host + '/users/register', {username, password});
    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('username',response.username);
    return response;
}

export async function logout() {
    const response = await get(settings.host + '/users/logout');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
}

async function request(url,options){
    try {
        const response= await fetch(url,options);
        if(!response.ok){
            const error=await response.json();
            throw new Error(error.message);
        }
        try {
            const data=  await response.json();
            return data;
        } catch (error) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function defineOptions(method='get',data){
    const options={
        method,
        headers:{}
    };
    if(data){
        options.headers={'Content-Type':'application/json'};
        options.body=JSON.stringify(data);
    }
    const token=sessionStorage.getItem('authToken');
    if(token){
        options.headers['X-Authorization']=token;
    }
    return options;
}