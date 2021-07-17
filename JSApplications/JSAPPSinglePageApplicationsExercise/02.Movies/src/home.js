import { create } from './domFactory.js'
import { request } from './reguestFactory.js'
import { showDetails } from './details.js'

let parent;
let section;
let container;

export function setupHome(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
    container = document.querySelector('.card-deck.d-flex.justify-content-center');
}


export async function showHome() {
    parent.innerHTML = '';
    parent.appendChild(section);
    container.innerHTML = 'Loading...';
    const data = await getMoviesRequest();
    const fragment = document.createDocumentFragment();
    data.map(createMoviePreview)
        .forEach(e => fragment.appendChild(e));
    container.innerHTML = '';
    container.appendChild(fragment);
}

function createMoviePreview(movie) {
    const entry = create('div', { className: 'card mb-4', 'data-id': movie._id },
        create('img', { className: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400' }),
        create('div', { className: 'card-body' },
            create('h4', { className: 'card-title' }, movie.title)),
        create('div', { className: 'card-footer' },
            create('button', { type: 'button', className: 'btn btn-info', onClick: () => showDetails(movie._id) }, 'Details')));
    if (!sessionStorage.getItem('userToken')) {
        entry.querySelector('button').disabled = true;
    }
    return entry;
}

async function getMoviesRequest() {
    return await request('http://localhost:3030/data/movies')
}

