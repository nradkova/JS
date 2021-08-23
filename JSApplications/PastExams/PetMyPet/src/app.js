import page from '../node_modules/page/page.mjs'
import {render} from '../../node_modules/lit-html/lit-html.js'

import navView from './views/nav.js'
import homeView from './views/home.js';
import registerView from './views/register.js';
import { logout } from './api/api.js';
import loginView from './views/login.js';
import catalogView from './views/catalog.js';
import createView from './views/create.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import myCollectionView from './views/myCollection.js';


const main=document.querySelector('main');
document.querySelector('.navbar').addEventListener('click',logoutUser);

setNav();
page.start();
page.redirect('/home')

page('/',decorateContext,homeView);
page('/index.html',decorateContext,homeView);
page('/home',decorateContext,homeView);
page('/register',decorateContext,registerView);
page('/login',decorateContext,loginView);
page('/catalog',decorateContext,catalogView);
page('/create',decorateContext,createView);
page('/details/:id',decorateContext,detailsView);
page('/edit/:id',decorateContext,editView);
page('/myCollection',decorateContext,myCollectionView);


function decorateContext(context,next){
    context.render = (content) => render(content, main);
    context.setNav = setNav();
    next();
}

function setNav(){
    render(navView(),document.querySelector('.navbar'));
}

async function logoutUser(event){
    if(event.target.id=='logout'){
        event.preventDefault();
        await logout();
        setNav();
        page.redirect('/catalog');
    }
}