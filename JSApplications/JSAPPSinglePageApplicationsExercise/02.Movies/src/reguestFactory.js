export async function request(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        alert(error.message)
        throw new Error();
    }
    if(!url.includes('logout')){
        return await response.json();
    }
}