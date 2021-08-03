import { createTeam,joinTeam,approveMember } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { styleMap } from "../../node_modules/lit-html/directives/style-map.js";


const createTemplate = (onSubmit,err) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit}id="create-form" class="main-form pad-large">
        <div style=${styleMap(err?{display:'inline-block'}:{display:'none'})} class="error">${err}</div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`;

export default async function createView(context) {

    context.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const team = {
            name: formData.get('name'),
            logoUrl: formData.get('logoUrl'),
            description: formData.get('description')
        };
        [... event.target.querySelectorAll('input')].forEach(e=>e.disabled=true);
        [... event.target.querySelectorAll('textarea')].forEach(e=>e.disabled=true);
        
        try {
            if (team.name.length < 4) {
                throw new Error("Name should be at least 4 characters!");
            }
            if (team.logoUrl == '') {
                throw new Error("LogoUrl is required!");
            }
            if (team.description.length < 10) {
                throw new Error("Description should be at least 10 characters!");
            }
            const teamCreated = await createTeam(team);
            context.page.redirect(`/details/${teamCreated._id}`);
            event.target.reset();
            
        } catch (error) {
            context.render(createTemplate(onSubmit, error.message));
        }
        finally{
            [... event.target.querySelectorAll('input')].forEach(e=>e.disabled=false);
            [... event.target.querySelectorAll('textarea')].forEach(e=>e.disabled=false);
        }
    }
}
