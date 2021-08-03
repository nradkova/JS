import { editTeam, getTeamById } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js'
import{until} from '../../node_modules/lit-html/directives/until.js'
import { loaderTemplate } from './common.js';

const editTemplate = (team,onSubmit,err) => html`
 <section @submit=${onSubmit}id="edit">
    <article class="narrow">
       <header class="pad-med">
           <h1>Edit Team</h1>
       </header>
       <form id="edit-form" class="main-form pad-large">
       <div style=${styleMap(err?{display:'inline-block'}:{display:'none'})} class="error">${err}</div>
           <label>Team name: <input type="text" name="name" .value=${team.name}></label>
           <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
           <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
           <input class="action cta" type="submit" value="Save Changes">
       </form>
    </article>
</section>`;

export default async function editView(context) {
    const id = context.params.id;

    context.render(until(fillTemplate(),loaderTemplate()));

    async function fillTemplate() {
        const team = await getTeamById(id);
       return editTemplate(team,onSubmit);

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
               await editTeam(id,team);
               event.target.reset();
               context.page.redirect(`/details/${id}`);
           } catch (error) {
               context.render(editTemplate(team,onSubmit, error.message));
           }
           finally{
               [... event.target.querySelectorAll('input')].forEach(e=>e.disabled=false);
               [... event.target.querySelectorAll('textarea')].forEach(e=>e.disabled=false);
           }
       }
    }

}