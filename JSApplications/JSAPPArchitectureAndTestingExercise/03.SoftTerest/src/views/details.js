import { create } from '../dom.js';
import { getIdeaById, delIdeaById } from '../api/data.js';

let navigation;
let sect;

export function setupDetails(section, nav) {
    navigation = nav;
    sect=section;
    return showDetails;

    async function showDetails(id) {
        section.innerHTML = '';
        const idea = await getIdeaById(id);
        section.appendChild(createIdeaPreview(idea));
        return section;
    }
}

function createIdeaPreview(idea) {
    const el = create('div', {},
        create('img', { className: 'det-img', src: idea.img }),
        create('div', { className: 'desc' },
            create('h2', { className: 'display-5' }, idea.title),
            create('p', { className: 'infoType' }, 'Description:'),
            create('p', { className: 'idea-description' }, idea.description)),
        create('div', { className: 'text-center' },
            create('a', { className: 'btn detb', href: '' }, 'Delete')));

    const userId = sessionStorage.getItem('userId');
    if (userId != null && idea._ownerId == userId) {
        el.querySelector('a').addEventListener('click', delIdea);
    } else {
        el.querySelector('a').remove();
    }
    
    return el;

    async function delIdea(event) {
        event.preventDefault();
        const confirmed = confirm(`Are you sure you want to delete ${idea.title}?`);
        if (confirmed) {
            await delIdeaById(idea._id);
            sect.innerHTML = '';
            navigation.goTo('dashboard');
        }
    }
}

