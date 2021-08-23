import { html, render } from '../../node_modules/lit-html/lit-html.js'

export const loaderTemplate = () => html`
<p class="loader">
    Loading&hellip;
</p>`;

const notificationTemplate = (msg) => html`
<div id="errorBox" class="notification">
    <span>${msg}</span>
</div>`;
const container= document.querySelector('#notifications');

export function notify(msg) {
    render(notificationTemplate(msg),container);
    setTimeout(clearNotify,3000)
}
export function clearNotify() {
    render('', container);
}
