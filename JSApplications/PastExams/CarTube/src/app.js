import page from '../node_modules/page/page.mjs'
import {render} from '../../node_modules/lit-html/lit-html.js'

import { logout } from './api/api.js';
import navView from './views/nav.js'
import loginView from './views/login.js';
import registerView from './views/register.js';
import homeView from './views/home.js';
import allListingsView from './views/allListings.js';
import createView from './views/create.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import myListingsView from './views/myListings.js';
import searchView from './views/search.js';


const main=document.querySelector('main');
document.querySelector('nav').addEventListener('click',logoutUser);

setNav();
page.start();
page.redirect('/home')

page('/index.html',decorateContext,homeView);
page('/',decorateContext,homeView);
page('/home',decorateContext,homeView);
page('/login',decorateContext,loginView);
page('/register',decorateContext,registerView);
page('/allListings',decorateContext,allListingsView);
page('/create',decorateContext,createView);
page('/details/:id',decorateContext,detailsView);
page('/edit/:id',decorateContext,editView);
page('/myListings',decorateContext,myListingsView);
page('/search',decorateContext,searchView);



function decorateContext(context,next){
    context.render = (content) => render(content, main);
    context.setNav = setNav();
    next();
}

function setNav(){
    render(navView(),document.querySelector('nav'));
}

async function logoutUser(event){
    if(event.target.id=='logoutBtn'){
        event.preventDefault();
        await logout();
        setNav();
        page.redirect('/home');
    }
}