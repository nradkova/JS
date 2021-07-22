import { setupHome, showHome } from './home.js'
import { setupDetails, showDetails } from './details.js'
import { setupCreate, showCreate } from './create.js'
import { setupLogin, showLogin } from './login.js'
import { setupRegister, showRegister } from './register.js'
import { setupEdit, showEdit } from './edit.js'
import { request } from './reguestFactory.js'

const main = document.querySelector('main');
const links = {
    homeLink: showHome,
    loginLink: showLogin,
    registerLink: showRegister,
    createLink: showCreate,
    logoutLink: logout
}

setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);

setupNav();
showHome();

document.querySelector('#views').remove();
function setupSection(id, setup) {
    setup(main, document.getElementById(id))
}

function setupNav() {
    document.querySelector('nav').addEventListener('click', (event) => {
        if (event.target.tagName == 'A') {
            const handler = links[event.target.id];
            if (typeof handler == 'function') {
                event.preventDefault();
                handler();
            }
        }
    })

    document.querySelector('#createLink').addEventListener('click', (event) => {
        event.preventDefault();
        showCreate();
    })

    if (!sessionStorage.getItem('userToken')) {
        document.querySelector('#add-movie-button').style.display = 'none';
        document.querySelectorAll('nav .user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('nav .guest').forEach(e => e.style.display = 'block');
        document.querySelector('#greeting').parentNode.style.display = 'block';
        document.querySelector('#greeting').textContent = 'Welcome, guest';
    } else {
        document.querySelector('#add-movie-button').style.display = 'block';
        document.querySelectorAll('nav .user').forEach(e => e.style.display = 'block');
        document.querySelectorAll('nav .guest').forEach(e => e.style.display = 'none');
        document.querySelector('#greeting').textContent = `Welcome, ${sessionStorage.getItem('userEmail')}`;
    }
}

async function logout() {
    await request('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('userToken')
        },
    });
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');

    document.querySelectorAll('nav .user').forEach(e => e.style.display = 'none');
    document.querySelectorAll('nav .guest').forEach(e => e.style.display = 'block');
    document.querySelector('#greeting').parentNode.style.display = 'block';
    document.querySelector('#greeting').textContent = 'Welcome, guest';

    showHome();
    document.querySelector('#add-movie-button').style.display = 'none';
}