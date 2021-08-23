import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAll } from '../api/data.js';


const catalogTemplate = (pets) => html`  
<section id="home-page" class="content">
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${pets.length>0 
            ? html`<ul class="other-pets-list">
                    ${pets.map(petTemplate)}
                  </ul>`
            : html`<p class="no-pets">No pets in database!</p>`}
    </section>
</section>`;


const petTemplate = (pet) => html` 
<li class="otherPet">
    <h3>Name: ${pet.name}</h3>
    <p>Type: ${pet.type}</p>
    <p class="img"><img src=${pet.imageUrl}></p>
    <a class="button" href="/details/${pet._id}">Details</a>
</li>`;

export default async function catalogView(context) {
    const pets=await getAll();
    context.render(catalogTemplate(pets));
}