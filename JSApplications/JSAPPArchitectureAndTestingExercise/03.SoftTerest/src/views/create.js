import { createIdea} from '../api/data.js';

export function setupCreate(section, nav) {
    const form = section.querySelector('form');

    form.addEventListener('submit',async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const body = {
            title: formData.get('title'),
            img: formData.get('imageURL'),
            description:formData.get('description')
        };
        if(body.title.length<6){
            alert('Title should be at least 6 characters long!')
            return;
        }
        if(body.description.length<10){
            alert('Description should be at least 10 characters long!')
            return;
        }
        if(body.img.length<5){
            alert('Image url should be at least 5 characters long!')
            return;
        }
        const result = await createIdea(body);
        nav.goTo('dashboard');
        form.reset();
    });

    return showCreate;

    function showCreate() {
        return section;
    }
}

