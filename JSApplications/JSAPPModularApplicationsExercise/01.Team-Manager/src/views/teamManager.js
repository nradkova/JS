import { html } from '../../node_modules/lit-html/lit-html.js'
import {styleMap} from '../../node_modules/lit-html/directives/style-map.js'

const teamManagerTemplate = (token,onClick) => html`
<section id="home">
    <article class="hero layout">
        <img src="./assets/team.png" class="left-col pad-med">
        <div class="pad-med tm-hero-col">
            <h2>Welcome to Team Manager!</h2>
            <p>Want to organize your peers? Create and manage a team for free.</p>
            <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
            <a style=${styleMap(token?{display:'none'}:{display:'inline-block'})} @click=${onClick} href="javascript:void(0)" class="action cta">Sign Up Now</a>
            <a style=${styleMap(token?{display:'inline-block'}:{display:'none'})} href = "/browseTeams" class="action cta">Browse Teams</a>
        </div>
    </article>
</section>`;

export default async function teamManagerView(context) {
    const token=sessionStorage.getItem('userId')
    context.render(teamManagerTemplate(token,onClick));
    context.setNav();

    function onClick(){
        context.render('');
    }
}