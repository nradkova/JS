const regForm = document.querySelector('[action="/register"]');
const loginForm = document.querySelector('[action="/login"]');

regForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onRegister([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log([...formData.entries()])
    onLogin([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
});

function onRegister(info) {
    if (info.email === '' || info.password === '') {
        return alert('Name/Password is required!');
    }
    if (info.password != info.rePass) {
        return alert('Password is incorrect!')
    }
    logRequest('http://localhost:3030/users/register',info);
}

function onLogin(info) {
    console.log(info)
    if (info.email === '' || info.password === '') {
        return alert('Name/Password is required!');
    }
    logRequest('http://localhost:3030/users/login',info);
}

async function logRequest(url,info) {
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: info.email, password: info.password})
    })
    if(!response.ok){
        const error=await response.json();
        return alert(error.message);
    }
    const data=await response.json();
    sessionStorage.setItem('userToken',data.accessToken);
   location.assign('./index.html');
}
