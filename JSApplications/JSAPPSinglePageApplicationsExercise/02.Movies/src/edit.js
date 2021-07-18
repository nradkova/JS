import { request } from './reguestFactory.js'
import { showHome } from './home.js';

let parent;
let section;

export function setupEdit(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
}

export async function showEdit(id) {
    parent.innerHTML = '';
    parent.appendChild(section);

    const previous = await request('http://localhost:3030/data/movies/' + id);
    section.querySelector('[name="title"]').value = previous.title;
    section.querySelector('[name="description"]').value = previous.description;
    section.querySelector('[name="imageUrl"]').value = previous.img;

    section.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        if (title === '' || description === '' || img === '') {
            return alert('All fields are required!');
        }
        const confirmed = confirm('Movie info will be modified!');
        if (!confirmed) {
            return;
        }
        const data = await request('http://localhost:3030/data/movies/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('userToken')
            },
            body: JSON.stringify({ title, description, img })
        });
        showHome();
    });
}
