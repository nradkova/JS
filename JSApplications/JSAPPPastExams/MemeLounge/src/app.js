import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout } from './api/data.js';
import homeView from './views/home.js'
import navView from './views/nav.js';
import loginView from './views/login.js';
import registerView from './views/register.js';
import createView from './views/create.js';
import allMemesView from './views/allMemes.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import myProfileView from './views/myProfile.js';

const main = document.querySelector('main');
document.querySelector('nav').addEventListener('click', logoutUser);


page('/', decorateContext, homeView);
page('/index.html', decorateContext, homeView);
page('/home', decorateContext, homeView);
page('/login', decorateContext, loginView);
page('/register', decorateContext, registerView);
page('/create', decorateContext, createView);
page('/allMemes', decorateContext, allMemesView);
page('/details/:id', decorateContext, detailsView);
page('/edit/:id', decorateContext, editView);
page('/myProfile', decorateContext, myProfileView);


page.start();
setNav();


function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    context.setNav = setNav;
    next();
}


function setNav() {
    render(navView(),document.querySelector('nav'));
}

async function logoutUser(event) {
    if(event.target.id=='logoutBtn'){
        event.preventDefault();
        await logout();
        setNav();
        page.redirect('/');
    }
}