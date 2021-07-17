import { showHome } from './home.js';
import { request } from './reguestFactory.js'

let parent;
let section;

export function setupRegister(parentTarget,sectionTarget){
    parent=parentTarget;
    section=sectionTarget;
    section.querySelector('form').addEventListener('submit', register);
}

export async function showRegister(){
    parent.innerHTML='';
    parent.appendChild(section);
}

async function register(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    if (email === '' || password === '') {
        return alert('Email/Password is required!');
    }

    if (password.length<6) {
        return alert('Password should be at least 6 characters long');
    }
    
    if (password !=repeatPassword) {
        return alert('Password is incorrect!');
    }
    
    const data = await request('http://localhost:3030/users/register', {
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