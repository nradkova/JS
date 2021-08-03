import { html,render } from '../../node_modules/lit-html/lit-html.js'

export const loaderTemplate = () => html`
<p class="loader">
    Loading&hellip;
</p>`;

// const modalTemplate = (msg) => html`
// <div class="modal">
//     <p>${msg}</p>
//     <a href="#" class="action">Action</a>
// </div>`;

// export function notify(msg){
//     render(modalTemplate(msg),document.querySelector('#overlay'));
// }
