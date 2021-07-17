import { create } from './domFactory.js'
import { showEdit } from './edit.js';
import { showHome } from './home.js';
import { request } from './reguestFactory.js'

let parent;
let section;

export function setupDetails(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
}

export async function showDetails(id) {
    parent.innerHTML = '';
    parent.appendChild(section);
    section.innerHTML = '';
    const data = await getMovieByIdRequest(id);
    const movie = await getMovieDetailsPreview(data);
    section.appendChild(movie);
}

async function getMovieDetailsPreview(movie) {
    const details = create('div', { className: 'container' },
        create('div', { className: 'row bg-light text-dark' },
            create('h1', {}, 'Movie Title: ' + movie.title),
            create('div', { className: 'col-md-8' },
                create('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })),
            create('div', { className: 'col-md-4 text-center' },
                create('h3', { className: 'my-3' }, 'Movie Description'),
                create('p', {}, movie.description),
                create('button', { className: 'btn btn-danger', href: '#' }, 'Delete'),
                create('button', { className: 'btn btn-warning', href: '#' }, 'Edit'),
                create('button', { className: 'btn btn-primary', href: '#' }, 'Like'),
                create('span', { className: 'enrolled-span' }, ''))));

    const delBtn = details.querySelector('.btn.btn-danger');
    const editBtn = details.querySelector('.btn.btn-warning');
    const likeBtn = details.querySelector('.btn.btn-primary');
    let likesCount = await likesCountDisplay();

    if (sessionStorage.getItem('userId') != movie._ownerId) {
        delBtn.style.display = 'none';
        editBtn.style.display = 'none';

        const liked = await getOwnLikeByMovieId(movie._id)
        if (liked.length != 0) {
            likeBtn.style.display = 'none';
        } else {
            likeBtn.addEventListener('click', likeMovie)
        }

    } else {
        delBtn.addEventListener('click', deleteMovie)
        editBtn.addEventListener('click', () => showEdit(movie._id))
        likeBtn.style.display = 'none';
    }


    return details;

    async function likeMovie(event) {
        event.target.style.display = 'none';
        await postLike(movie._id);
        likesCount++;
        details.querySelector('span').textContent = 'Likes ' + likes;
    }

    async function likesCountDisplay() {
        let likes = await getMovieLikes(movie._id);
        details.querySelector('span').textContent = 'Likes ' + likes;
        return likes;
    }
    async function deleteMovie() {
        await deleteMovieRequest(movie._id);
        showHome();
    }
}

async function postLike(id) {
    return await request('http://localhost:3030/data/likes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify({ 'movieId': id })
    })
}

async function getMovieLikes(id) {
    return await request(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
}

async function getOwnLikeByMovieId(id) {
    const userId = sessionStorage.getItem('userId');
    return await request(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22 `)
}

async function getMovieByIdRequest(id) {
    return await request('http://localhost:3030/data/movies/' + id)
}

async function deleteMovieRequest(id) {
    return await request('http://localhost:3030/data/movies/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': sessionStorage.getItem('userToken')
        },
    })
}

