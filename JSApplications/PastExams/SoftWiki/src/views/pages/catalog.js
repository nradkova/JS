import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getAll} from '../../api/data.js';


const catalogTemplate = (articles) => html`  
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${articles.length>0
    ? html`${articles.map(articleTemplate)}`
    : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

const articleTemplate = (article) => html` 
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export default async function catalogView(context) {
    const articles = await getAll();
    context.render(catalogTemplate(articles));
}
