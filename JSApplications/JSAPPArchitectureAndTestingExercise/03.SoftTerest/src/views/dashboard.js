import { create } from '../dom.js';
import { getIdeas } from '../api/data.js';

let navigation;

export function setupDashboard(section, nav) {
    navigation=nav;
    return showDashboard;

    async function showDashboard() {
        section.innerHTML='';
        const ideas = await getIdeas();

        if (ideas.length != 0) {
            const fragment = new DocumentFragment();
            ideas
                .map(createPreview)
                .forEach(e => fragment.appendChild(e));
            section.appendChild(fragment);
        }else{
            section.appendChild(create('h1',{},'No ideas yet! Be the first one :)'));
        }

        return section;
    }
}

function createPreview(idea) {
   const el= create('div', { className: 'card overflow-hidden current-card details', 'data-id': idea._id, 'data-ownerId': idea._ownerId },
        create('div', { className: 'card-body' },
            create('p', { className: 'card-text' }, idea.title)),
        create('img', { className: 'card-image', src: idea.img, alt: 'Card image cap' }),
        create('a', { className: 'btn', href: '',onClick:show}, 'Details'));

    el.style.width='20rem';
    el.style.height='18rem';

    return el;

    function show(event){
        event.preventDefault();
        navigation.goTo('details',idea._id)
    }
}

