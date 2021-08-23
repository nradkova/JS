import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getOneById, delOne } from '../../api/data.js';


const detailsTemplate = (article, isOwner, onDelete) => html`  
<section id="details-page" class="content details">
    <h1>${article.title}</h1>
    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>
        <div class="buttons">
            ${isOwner
                 ? html`<a href="/edit/${article._id}" class="btn edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                        <a href='/home' class="btn edit">Back</a>`
                 : html`<a href='/home' class="btn edit">Back</a>`}
        </div>
    </div>
</section>`;

export default async function detailsView(context) {
    const articleId = context.params.id;
    const article = await getOneById(articleId);
    const isOwner=context.user&&context.user._id==article._ownerId;

    context.render(detailsTemplate(article,isOwner,onDelete));
 
    async function onDelete(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure?');
        if (!confirmed) {
            return;
        }
        delOne(articleId)
        context.page.redirect('/home')
    }
}
