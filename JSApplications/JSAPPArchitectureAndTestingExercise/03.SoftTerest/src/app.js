import { logout } from './api/data.js';
import { setupHome } from './views/home.js';
import { setupDashboard } from './views/dashboard.js';
import { setupDetails } from './views/details.js';
import { setupCreate } from './views/create.js';
import { setupLogin } from './views/login.js';
import { setupRegister } from './views/register.js';

const main = document.querySelector('main');
const navbar = document.querySelector('nav');

const views = {};
const links = {};

const navigation = {
    goTo,
    setUserNav
};

registerView('home', document.getElementById('home-page'), setupHome, 'homeLink');
registerView('dashboard', document.getElementById('dashboard-holder'), setupDashboard, 'dashboardLink');
registerView('details', document.getElementById('details-page'), setupDetails);
registerView('create', document.getElementById('create-page'), setupCreate, 'createLink');
registerView('login', document.getElementById('login-page'), setupLogin, 'loginLink');
registerView('register', document.getElementById('register-page'), setupRegister, 'registerLink');
document.getElementById('views').remove();

setUpNavigation();

goTo('home')

function registerView(name, section, setup, linkId) {
    const view = setup(section, navigation);
    views[name] = view;
    if (linkId) {
        links[linkId] = name;
    }
}

async function goTo(name, ...params) {
    main.innerHTML = '';
    const view = views[name];
    const section = await view(...params);
    main.appendChild(section);
}

function setUpNavigation() {
    setUserNav();
    navbar.addEventListener('click', async (event) => {
        if (event.target.id === 'logoutBtn') {
            event.preventDefault();
            return logoutUser()
        }
        const viewName = links[event.target.id];
        if (viewName) {
            event.preventDefault();
            goTo(viewName);
        }
    })
}

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        navbar.querySelectorAll('.user-nav').forEach(e => e.style.display = 'list-item');
        navbar.querySelectorAll('.guest-nav').forEach(e => e.style.display = 'none');
    } else {
        navbar.querySelectorAll('.user-nav').forEach(e => e.style.display = 'none');
        navbar.querySelectorAll('.guest-nav').forEach(e => e.style.display = 'list-item');
    }
}

async function logoutUser() {
    await logout();
    setUserNav();
    goTo('home');
}
