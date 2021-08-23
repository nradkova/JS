import { html } from '../../node_modules/lit-html/lit-html.js'

const navTemplate = (username) => html` 
<a class="active" href="/home">Home</a>
<a href="/allListings">All Listings</a>
<a href="/search">By Year</a>
${!username
    ? html`<div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        </div>`
    : html`<div id="profile">
        <a>Welcome ${username}</a>
        <a href="/myListings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a id='logoutBtn' href="javascript:void(0)">Logout</a>
        </div>`}`;

export default function navView() {
    const username = sessionStorage.getItem('username');
    return navTemplate(username);
}