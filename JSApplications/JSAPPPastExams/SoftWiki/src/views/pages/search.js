import { html } from '../../../node_modules/lit-html/lit-html.js'
import { mySearch } from '../../api/data.js';

const searchTemplate = (articles, onSearch,search) => html`  
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input id='searchField' type="text" placeholder="Search by article title" name="search" .value=${search?search:''}>
        </p>
        <p class="field submit">
            <input id='searchBtn' class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${articles.length > 0
        ? html`${articles.map(articleTemplate)}`
        : html`<h3 class="no-articles">No matching articles</h3>`
    }
    </div>
</section>`;

const articleTemplate = (article) => html` 
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export default async function searchView(context) {
    const search = context.querystring.split('=')[1];
    const articles =search&&search!=''?await mySearch(search):[];
    context.render(searchTemplate(articles, onSearch,search));

    async function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('search');
        context.page.redirect('/search?query=' + query);
    }
}