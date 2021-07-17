import { showHome } from './home.js';
import { request } from './reguestFactory.js'

let parent;
let section;

export function setupLogin(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
    section.querySelector('form').addEventListener('submit', login);
}


export async function showLogin() {
    parent.innerHTML = '';
    parent.appendChild(section);
}

async function login(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === '' || password === '') {
        return alert('Name/Password is required!');
    }
    const data = await request('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('userEmail', data.email);
    document.querySelectorAll('nav .user').forEach(e => e.style.display = 'block');
    document.querySelectorAll('nav .guest').forEach(e => e.style.display = 'none');
    document.querySelector('#greeting').textContent = `Welcome, ${email}`;
    showHome();
    document.querySelector('#add-movie-button').style.display = 'block';
}