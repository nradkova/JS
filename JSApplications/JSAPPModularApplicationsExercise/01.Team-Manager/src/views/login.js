import { login } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import {styleMap} from '../../node_modules/lit-html/directives/style-map.js'


const loginTemplate = (onSubmit,err) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
            <div style=${styleMap(err?{display:'inline-block'}:{display:'none'})} class="error">${err}</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`;

export default function loginView(context) {
    let err=false;
    context.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        try {
            await login(email, password);
            event.target.reset();
            context.setNav();
            context.page.redirect('/myTeams');
        } catch (error) {
            context.render(loginTemplate(onSubmit,error.message));
        }
    }
}
