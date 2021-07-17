import { request } from './reguestFactory.js'
import { showHome } from './home.js';

let parent;
let section;

export function setupCreate(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
    section.querySelector('form').addEventListener('submit', createMovie);
}

export async function showCreate() {
    parent.innerHTML = '';
    parent.appendChild(section);

}

async function createMovie(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    if (title === '' || description === '' || img === '') {
        return alert('All fields are required!');
    }

    const data = await request('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify({ title, description, img })
    });
    showHome();
}