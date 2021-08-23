import { html, render } from '../../node_modules/lit-html/lit-html.js'

const notificationsTemplate = (code, msg) => html` 
${code == 'load'
        ? html`<div id="loadingBox" class="notification">
                <span>Loading …</span>
                </div>`
        : ''}
${code == 'info'
        ? html`<div id="infoBox" class="notification">
                <span>${msg}</span>
                </div>`
        : ''}
${code == 'error'
        ? html`<div id="errorBox" class="notification">
                <span>${msg}</span>
                </div>`
        : ''}`;

const container = document.querySelector('#notifications');

export default function notify(code, msg) {
    console.log(code)
    render(notificationsTemplate(code, msg), container);
    if (code != 'load') {
        setTimeout(clear, 3000);
    }
}
function clear() {
    render('', container)
}