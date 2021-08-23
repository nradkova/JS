import { editMeme, getMemeById } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { notify } from './common.js';

const editTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"
                .value=${meme.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export default async function editView(context) {
    const id = context.params.id;
    const meme = await getMemeById(id);
    
    context.render(editTemplate(meme,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl')
        };
        [...event.target.querySelectorAll('input')].forEach(e => e.disabled = true);
        [...event.target.querySelectorAll('textarea')].forEach(e => e.disabled = true);

        if (data.title == '' || data.imageUrl == '' || data.description == '') {
            [...event.target.querySelectorAll('input')].forEach(e => e.disabled = false);
            [...event.target.querySelectorAll('textarea')].forEach(e => e.disabled = false);
            return notify('All fields are required!')
        }

        await editMeme(id, data);
        [...event.target.querySelectorAll('input')].forEach(e => e.disabled = false);
        [...event.target.querySelectorAll('textarea')].forEach(e => e.disabled = false);
        event.target.reset();
        context.page.redirect(`/details/${id}`);
    }

}