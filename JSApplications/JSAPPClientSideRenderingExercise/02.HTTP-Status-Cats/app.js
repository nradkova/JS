import { html, render } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';

import {cats} from './catSeeder.js';

cats.map(e => e.detailsDisplay = false);
const catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">${!cat.detailsDisplay ? 'Show' : 'Hide'} status code</button>
        <div class="status"  style=${styleMap(cat.detailsDisplay? {}:{display: 'none'})} id=${cat.id}>
            <h4>${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;
const catListTemplate = (cats) => html`
<ul @click=${toggle}>
    ${cats.map(catTemplate)};
</ul>`;

const container = document.querySelector('#allCats');

attachContent();

function attachContent() {
    const templateResult = catListTemplate(cats);
    render(templateResult, container);
}

function toggle(event){
    if(event.target.tagName=='BUTTON'){
        const catId=event.target.parentNode.querySelector('.status').id;
        const cat=cats.find(c=>c.id==catId);
        cat.detailsDisplay=!cat.detailsDisplay;
        attachContent();
    }
}

