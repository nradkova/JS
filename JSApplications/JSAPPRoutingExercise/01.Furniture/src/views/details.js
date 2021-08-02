import { getEntryById,delEntry } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
import {styleMap} from '../../node_modules/lit-html/directives/style-map.js'

const detailsTemplate = (item,userId,onDelete) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div >
    <div class="col-md-4">
    <p>Make: <span>${item.make}</span></p>
    <p>Model: <span>${item.model}</span></p>
    <p>Year: <span>${item.year}</span></p>
    <p>Description: <span>${item.description}</span></p>
    <p>Price: <span>${item.price}</span></p>
    <p>Material: <span>${item.material}</span></p>
    <div style=${styleMap(userId==item._ownerId?{display:'inline-block'}:{display:'none'})}>
        <a href='/edit/${item._id}' class="btn btn-info">Edit</a>
        <a @click=${onDelete} href='/' class="btn btn-red">Delete</a>
    </div>
</div>`;

export default async function detailsView(context) {
    const id=context.params.id;
    const userId=sessionStorage.getItem('userId');
    const item = await getEntryById(id);

    if (item.img.startsWith('.')) {
        item.img = item.img.slice(1);
    }

    context.render(detailsTemplate(item,userId,onDelete));

    async function onDelete(){
        await delEntry(id);
        context.page.redirect('/dashboard');
    }
}