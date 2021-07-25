import { login } from '../api/data.js';

export function setupLogin(section, nav) {

    const form = section.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        await login(email, password);
        form.reset();
        nav.setUserNav();
        nav.goTo('home');
        
    });

    return showLogin;

    function showLogin() {
        return section;
    }
}