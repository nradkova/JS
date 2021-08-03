import { getTeamById, joinTeam, getRequestsByTeam, removeMemberByRequest, approveMember } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import { until } from '../../node_modules/lit-html/directives/until.js'
import { loaderTemplate } from './common.js';

const detailsTemplate = (team, mainSection, membersSection, pendingSection) => html`
<section id="team-home">
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.membersCount} Members</span>
            <div>
                ${mainSection()}
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                ${membersSection()}
            </ul>
        </div>
        <div class="pad-large">
            ${pendingSection()}
        </div>
    </article>
</section>`;


export default async function detailsView(context) {
    const id = context.params.id;
    const team = await getTeamById(id);

    context.render(until(fillTemplate(id), loaderTemplate()));

    async function fillTemplate(id) {
        const userId = sessionStorage.getItem('userId');
        const username = sessionStorage.getItem('username');
        const [team, requests] = await Promise.all([
            getTeamById(id),
            getRequestsByTeam(id)
        ]);
        team.membersRequests = requests.filter(x => x.status == 'member');
        team.pendingRequests = requests.filter(x => x.status == 'pending');
        team.membersCount = team.membersRequests.length;
        return detailsTemplate(team, mainSection, membersSection, pendingSection);

        function mainSection() {
            if (userId == null) {
                return '';
            }
            if (userId == team._ownerId) {
                return html`<a href=${'/edit/' + team._id} class="action">Edit team</a>`;

            } else if (team.membersRequests.some(r => r._ownerId == userId)) {
                const request = team.membersRequests.find(r => r._ownerId == userId);
                return html`<a @click=${(event) => leave(event, request)} href="javascript:void(0)" class="action invert">Leave team</a>`;

            } else if (team.pendingRequests.some(r => r._ownerId == userId)) {
                const request = team.pendingRequests.find(r => r._ownerId == userId);
                return html`Membership pending. <a @click=${(event) => leave(event, request)} href="javascript:void(0)">Cancel request</a>`;

            } else {
                return html`<a @click=${join}href="javascript:void(0)" class="action">Join team</a>`;
            }
        }

        function membersSection() {
            const teamMembers = team.membersRequests.filter(r => r.user.username != username);
            if (userId == team._ownerId) {
                return html`
                    <li>${username}</li>
                    ${teamMembers.map(r => html`
                    <li>${r.user.username}
                        <a @click=${(event) => remove(event, r)} href="javascript:void(0)" class="tm-control
                            action">Remove from team</a>
                    </li>`)}`;
            }
            return html`${teamMembers.map(r => html`<li>${r.user.username}</li>`)}`;
        }

        function pendingSection() {
            if (userId != team._ownerId) {
                return '';
            }
            const teamPending = team.pendingRequests.filter(r => r.user.username != username);
            return html`
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    ${teamPending.map(r => html`
                    <li>${r.user.username}
                        <a @click=${(event) => approve(event, r)} href="javascript:void(0)" class="tm-control action">Approve</a>
                        <a @click=${(event) => decline(event, r)} href="javascript:void(0)" class="tm-control action">Decline</a>
                    </li>`)}
                </ul>`;
        }

        async function join(event) {
            event.target.remove();
            await joinTeam(id);
            context.render(await fillTemplate(id));
        }
        async function approve(event, request) {
            const confirmed = confirm(request.user.username + '\'s request will be approved!');
            if (!confirmed) {
                return;
            }
            event.target.remove();
            request.status = 'member';
            await approveMember(request._id, request);
            context.render(await fillTemplate(id));
        }

        async function leave(event, request) {
            cancelMemberShip(event, request, 'Are you sure?')
        }
        
        async function remove(event, request) {
            cancelMemberShip(event, request, request.user.username + ' will no longer be a member of your team?');
        }

        async function decline(event, request) {
            cancelMemberShip(event, request, request.user.username + '\'s request will be declined!');
        }

        async function cancelMemberShip(event, request, message) {
            const confirmed = confirm(message);
            if (!confirmed) {
                return;
            }
            event.target.remove();
            await removeMemberByRequest(request._id);
            context.render(await fillTemplate(id));
        }
    }
}