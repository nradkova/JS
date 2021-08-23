import { login } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { notify } from './common.js';

const loginTemplate = (onSubmit, err) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export default function loginView(context) {
    let err = false;
    context.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email == "" || password == "") {
            return notify('All fields are required!');
        }
        await login(email, password);
        event.target.reset();
        context.setNav();
        context.page.redirect('/allMemes');
    }
}
