import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getUserData } from '../../api/user.js';

const navTemplate = (user) => html` 
<a href="/catalog">Dashboard</a>
${!user
    ? html`<div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>`
    : html`<div id="user">
    <span>Welcome, ${user.email}</span>
    <a class="button" href="/myCollection">My Books</a>
    <a class="button" href="/create">Add Book</a>
    <a id="logoutBtn" class="button" href="javascript:void(0)">Logout</a>
</div>`}`;

export default function navView() {
    const user = getUserData();
    return navTemplate(user);
}
