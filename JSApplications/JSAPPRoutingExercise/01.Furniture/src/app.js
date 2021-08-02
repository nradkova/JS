import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import dashboardView from './views/dashboard.js'
import loginView from './views/login.js';
import registerView from './views/register.js';
import myFurnitureView from './views/myFurniture.js';
import detailsView from './views/details.js';
import createView from './views/create.js';
import editView from './views/edit.js';

const main = document.querySelector('.container');
document.querySelector('#logoutBtn').addEventListener('click',logoutUser);

const links = {
    '/dashboard': document.querySelector('#catalogLink'),
    '/create': document.querySelector('#createLink'),
    '/my-furniture': document.querySelector('#profileLink'),
    '/login': document.querySelector('#loginLink'),
    '/register': document.querySelector('#registerLink'),
}

page('/', decorateContext, dashboardView);
page('/dashboard', decorateContext, dashboardView);
page('/login', decorateContext, loginView);
page('/register', decorateContext, registerView);
page('/create', decorateContext, createView);
page('/details/:id', decorateContext, detailsView);
page('/edit/:id', decorateContext, editView);
page('/my-furniture', decorateContext, myFurnitureView);


page.start();
setNav();


function decorateContext(context, next) {
    Object.entries(links).forEach(([k, v]) => k == context.pathname ? v.classList.add('active') : v.classList.remove('active'));
    context.render = (content) => render(content, main);
    context.setNav = setNav;
    next();
}

function setNav() {
    const token = sessionStorage.getItem('userId');
    if (token) {
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';

    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

async function logoutUser() {
    await logout();
    setNav();
    page.redirect('/dashboard');
}