import { html } from '../../node_modules/lit-html/lit-html.js'

const navTemplate = (email) => html` 
<section class="navbar-dashboard">
<a href="/catalog">Dashboard</a>
${!email
    ? html`<div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>`
    : html`<div id="user">
    <span id = 'welcome'>Welcome, ${email}</span>
    <a class="button" href="/myCollection">My Pets</a>
    <a class="button" href="/create">Add Pet</a>
    <a id = 'logout' class="button" href="/logout">Logout</a>
</div>`}
</section>
`;

export default function navView() {
    const email = sessionStorage.getItem('email');
    return navTemplate(email);
}
