import { html } from '../../node_modules/lit-html/lit-html.js'
import { getOneById, delOne } from '../api/data.js';


const detailsTemplate = (car, isOwner, onClick) => html`  
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>
        <p class="description-para">${car.description}</p>
        ${isOwner
        ? html` <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onClick} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`
        : ''}
    </div>
</section>`;

export default async function detailsView(context) {
    const carId = context.params.id;
    const userId = sessionStorage.getItem('userId');
    const car = await getOneById(carId);
    
    context.render(detailsTemplate(car, userId == car._ownerId,onClick));

    async function onClick(event) {
        event.preventDefault();
        const confirmed=confirm('Are you sure?');
        if(!confirmed){
            return;
        }
        delOne(carId)
        context.page.redirect('/allListings')
    }
}