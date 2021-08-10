import {render} from '../../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'

import { getUserData } from './api/user.js';
import {loginView} from './views/authentication/login.js';
import {registerView} from './views/authentication/register.js';
import {logout} from './views/authentication/logout.js';
import navView from './views/navigation/nav.js'
import catalogView from './views/pages/catalog.js';
import createView from './views/pages/create.js';
import detailsView from './views/pages/details.js';
import editView from './views/pages/edit.js';
import myCollectionView from './views/pages/myCollection.js';



const main=document.querySelector('main');
document.querySelector('.navbar-dashboard').addEventListener('click',logoutUser);

setNav();
page.start();
page.redirect('/catalog')

page('/',decorateContext,catalogView);
page('/index.html',decorateContext,catalogView);
page('/catalog',decorateContext,catalogView);
page('/login',decorateContext,loginView);
page('/register',decorateContext,registerView);
page('/create',decorateContext,createView);
page('/details/:id',decorateContext,detailsView);
page('/edit/:id',decorateContext,editView);
page('/myCollection',decorateContext,myCollectionView);


function decorateContext(context,next){
    context.render = (content) => render(content, main);
    context.user=getUserData();
    context.setNav = setNav;
    next();
}

function setNav(){
    render(navView(),document.querySelector('.navbar-dashboard'));
}

async function logoutUser(event){
    if(event.target.id=='logoutBtn'){
        event.preventDefault();
        await logout();
        setNav();
        page.redirect('/catalog');
    }
}