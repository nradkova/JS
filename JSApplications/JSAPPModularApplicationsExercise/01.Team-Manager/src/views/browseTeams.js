import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllTeams} from '../api/data.js';
import { until } from '../../node_modules/lit-html/directives/until.js'
import { loaderTemplate } from './common.js';

const browseTeamsTemplate = (data, isUser) => html`
<section id="browse">
    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    ${isUser
    ? html`<article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>`
    : ''}
    ${data.map(teamTemplate)}
</section>`;

const teamTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details" > ${team.membersCount} members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`;

export default async function browseTeamsView(context) {
    const token = sessionStorage.getItem('userId');
    const teams = await getAllTeams();

    async function fillTemplate() {
        return browseTeamsTemplate(teams, token != null);
    }

    context.setNav();
    context.render(until(fillTemplate(), loaderTemplate()));
}