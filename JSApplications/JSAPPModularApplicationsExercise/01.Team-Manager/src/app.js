import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import teamManagerView from './views/teamManager.js'
import loginView from './views/login.js';
import registerView from './views/register.js';
import browseTeamsView from './views/browseTeams.js';
import createView from './views/create.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import myTeamsView from './views/myTeams.js';

const main = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', logoutUser);


page('/', decorateContext, teamManagerView);
page('/index.html', decorateContext, teamManagerView);
page('/teamManager', decorateContext, teamManagerView);
page('/login', decorateContext, loginView);
page('/register', decorateContext, registerView);
page('/browseTeams', decorateContext, browseTeamsView);
page('/create', decorateContext, createView);
page('/details/:id', decorateContext, detailsView);
page('/edit/:id', decorateContext, editView);
page('/myTeams', decorateContext, myTeamsView);


page.start();
setNav();


function decorateContext(context, next) {
    // Object.entries(links).forEach(([k, v]) => k == context.pathname ? v.classList.add('active') : v.classList.remove('active'));
    context.render = (content) => render(content, main);
    context.setNav = setNav;
    next();
}


function setNav() {
    const token = sessionStorage.getItem('userId');
    if (token) {
        document.querySelector('#browseTeamsLink').style.display = 'inline-block';
        document.querySelector('#myTeamsLink').style.display = 'inline-block';
        document.querySelector('#logoutBtn').style.display = 'inline-block';

        document.querySelector('#loginLink').style.display = 'none';
        document.querySelector('#registerLink').style.display = 'none';

    } else {
        document.querySelector('#myTeamsLink').style.display = 'none';
        document.querySelector('#logoutBtn').style.display = 'none';

        document.querySelector('#browseTeamsLink').style.display = 'inline-block';
        document.querySelector('#loginLink').style.display = 'inline-block';
        document.querySelector('#registerLink').style.display = 'inline-block';
    }
}

async function logoutUser() {
    await logout();
    setNav();
    page.redirect('/teamManager');
}