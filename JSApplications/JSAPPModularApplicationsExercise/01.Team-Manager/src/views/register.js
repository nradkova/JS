import { register } from "../api/data.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { styleMap } from "../../node_modules/lit-html/directives/style-map.js";

const registerTemplate = (onSubmit, err) => html` <section id="register">
  <article class="narrow">
    <header class="pad-med">
      <h1>Register</h1>
    </header>
    <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
      <div
        style=${styleMap(
          err ? { display: "inline-block" } : { display: "none" }
        )}
        class="error"
      >
        ${err}
      </div>
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Username: <input type="text" name="username" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <label>Repeat: <input type="password" name="repass" /></label>
      <input class="action cta" type="submit" value="Create Account" />
    </form>
    <footer class="pad-small">
      Already have an account? <a href="/login" class="invert">Sign in here</a>
    </footer>
  </article>
</section>`;

export default function registerView(context) {
  context.render(registerTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const rePass = formData.get("repass");
    try {
      if (email == "") {
        throw new Error("Invalid email!");
      }
      if (username.length < 3) {
        throw new Error("Username should be at least 3 characters!");
      }
      if (password.length < 3) {
        throw new Error("Username should be at least 3 characters/digits!");
      }
      if (password != rePass) {
        throw new Error("Passwords do not match!");
      }
      await register(email, username, password);
      event.target.reset();
      context.setNav();
      context.page.redirect("/myTeams");
    } catch (error) {
      context.render(registerTemplate(onSubmit, error.message));
    }
  }
}
