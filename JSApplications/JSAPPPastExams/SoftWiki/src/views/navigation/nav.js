import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getUserData } from '../../api/user.js';

const navTemplate = (user) => html` 
<a href="/catalog">Catalogue</a>
<a href="/search">Search</a>
${!user
    ? html`<div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            </div>`
    : html`<div id="user">
            <a href="/create">Create</a>
            <a id = 'logout' href="javascript:void(0)">Logout</a>
            </div>`}`;

export default function navView() {
    const user=getUserData();
    return navTemplate(user);
}
