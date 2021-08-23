import {render} from '../../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'

import { getUserData } from './api/user.js';
import {loginView} from './views/authentication/login.js';
import {registerView} from './views/authentication/register.js';
import {logout} from './views/authentication/logout.js';

import navView from './views/navigation/nav.js'
import homeView from './views/pages/home.js';
import catalogView from './views/pages/catalog.js';
import createView from './views/pages/create.js';
import detailsView from './views/pages/details.js';
import editView from './views/pages/edit.js';
import searchView from './views/pages/search.js';

const main=document.querySelector('main');
document.querySelector('.nav-buttons').addEventListener('click',logoutUser);

setNav();
page.start();
page.redirect('/home')

page('/',decorateContext,homeView);
page('/index.html',decorateContext,homeView);
page('/home',decorateContext,homeView);
page('/login',decorateContext,loginView);
page('/register',decorateContext,registerView);
page('/catalog',decorateContext,catalogView);
page('/create',decorateContext,createView);
page('/details/:id',decorateContext,detailsView);
page('/edit/:id',decorateContext,editView);
page('/search',decorateContext,searchView);


function decorateContext(context,next){
    context.render = (content) => render(content, main);
    context.user=getUserData();
    context.setNav = setNav;
    next();
}

function setNav(){
    render(navView(),document.querySelector('.nav-buttons'));
}

async function logoutUser(event){
    if(event.target.id=='logout'){
        event.preventDefault();
        await logout();
        setNav();
        page.redirect('/catalog');
    }
}