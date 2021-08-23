import { html } from '../../node_modules/lit-html/lit-html.js'

const homeTemplate = () => html`  
<section class="basic">
    <h1> Welcome to pet my pet!</h1>
</section>`;

export default function homeView(context) {

    context.render(homeTemplate());
}