import { html, render } from './node_modules/lit-html/lit-html.js';

const listTemplate = (towns) => html`
    <ul>
        ${towns.map(e => html`<li>${e}</li>`)}
    </ul>`;

const root = document.querySelector('#root');
document.querySelector('#btnLoadTowns').addEventListener('click', onLoad);

function onLoad(event) {
    event.preventDefault();
    const form = event.target.parentNode;
    let input = form.querySelector('#towns').value;
    input = input.split(',').map(e=>e.trim()).filter(e=>e!='');
    render(listTemplate(input), root);
}

