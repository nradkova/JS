import { setupHome, showHome } from './home.js'
import { setupComments,showComments } from './comment.js';

const container = document.querySelector('.container');


setupHome(document.querySelector('main'),document.querySelector('#home-page'));
setupComments(document.querySelector('main'),document.querySelector('#comments-page'))

showHome();

document.querySelector('#homeLink').addEventListener('click', (event) => {
    event.preventDefault();
    showHome();
})

