import { delMeme, getMemeById } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { notify } from './common.js';

const detailsTemplate = (meme, isOwner,onDeleteMeme) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${isOwner
                ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDeleteMeme} class="button danger">Delete</button>`
                : ''}
        </div>
    </div>
</section>`;

export default async function detailsView(context) {
    const id = context.params.id;
    const userId = sessionStorage.getItem('userId');
    const meme = await getMemeById(id);

    context.render(detailsTemplate(meme, userId == meme._ownerId,onDeleteMeme));

    async function onDeleteMeme(){
      notify('Are you sure?');
        await delMeme(id);
        context.page.redirect('/allMemes');
    }
}