import { getMyMemes} from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'

const myProfileTemplate = (user, memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${user.memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${user.memes.length>0
        ? html`${user.memes.map(memeTemplate)}`
        : html` <p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export default async function myProfileView(context) {
    const user = {
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        gender: sessionStorage.getItem('gender')
    }
    user.memes = await getMyMemes();
    context.render(myProfileTemplate(user));
}