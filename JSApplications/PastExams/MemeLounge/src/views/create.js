import { createMeme } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { notify } from './common.js';

const createTemplate = (onSubmit) => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export default async function createView(context) {

    context.render(createTemplate(onSubmit));

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

        await createMeme(data);
        [...event.target.querySelectorAll('input')].forEach(e => e.disabled = false);
        [...event.target.querySelectorAll('textarea')].forEach(e => e.disabled = false);
        event.target.reset();
        context.page.redirect('/allMemes');
    }

}
