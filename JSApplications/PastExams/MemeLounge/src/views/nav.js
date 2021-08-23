import { html } from '../../node_modules/lit-html/lit-html.js'

const navTemplate = (token,email) => html`
<nav>
    ${token
    ? html`<div class="user">
        <a id='allMemes' href="/allMemes">All Memes</a>
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${email}</span>
            <a href="/myProfile">My Profile</a>
            <a id='logoutBtn' href="javascript:void(0)">Logout</a>
        </div>
    </div>`
    : html`<div class="guest">
        <a class="active" href="/home">Home Page</a>
        <a id='allMemes' href="/allMemes">All Memes</a>
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    </div>`}
</nav>`;

export default function navView(context) {
    const token = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    return navTemplate(token,email);
}