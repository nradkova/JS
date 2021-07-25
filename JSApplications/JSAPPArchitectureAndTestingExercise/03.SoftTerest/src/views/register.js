import { register } from '../api/data.js';

export function setupRegister(section, nav) {
    const form = section.querySelector('form');

    form.addEventListener('submit',async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        if(email.length<3){
            alert('Email should be at least 3 characters long!')
            return;
        }
        if(password.length<3){
            alert('Password should be at least 3 characters long!')
            return;
        }
        if(password!=repeatPassword){
            alert('Password is not correct!')
            return;
        }
        await register(email, password);
        form.reset();
        nav.setUserNav();
        nav.goTo('home');
    });

    return showRegister;

    function showRegister() {
        return section;
    }
}