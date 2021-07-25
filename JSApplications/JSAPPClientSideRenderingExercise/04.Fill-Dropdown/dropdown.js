import { html, render } from './node_modules/lit-html/lit-html.js';

const menuTemplate = (items) => html`
<select id="menu">
    ${items.map(i => html`<option>${i.text}</option>`)}
</select>`;

const endpoint = 'http://localhost:3030/jsonstore/advanced/dropdown';
const container = document.querySelector('div');

start();

async function start() {
    const items = Object.values(await getItems());
    console.log(items)
    document.querySelector('form').addEventListener('submit', (event) => addItem(event, items));

    attachContent(items);
}

function attachContent(items) {
    const resultTemplate = menuTemplate(items);
    render(resultTemplate, container)
}

async function addItem(event, items) {
    event.preventDefault();
    const inputField = event.target.parentNode.querySelector('#itemText');
    if (inputField.value == '') {
        return;
    }
    const newItem = await postItem(inputField.value);
    items.push(newItem);
    inputField.value = '';
    attachContent(items);
}

async function getItems() {
    const response = await fetch(endpoint);
    if (response.ok) {
        return await response.json();
    }
}

async function postItem(text) {
    const response = await fetch(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    })
    if (response.ok) {
        return await response.json();
    }
}
