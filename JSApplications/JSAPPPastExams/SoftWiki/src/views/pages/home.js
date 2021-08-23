import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getRecentArticles } from '../../api/data.js';

const homeTemplate = (articles) => html`  
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${articles['JavaScript'].length>0
            ? html`${articles['JavaScript'].map(articleTemplate)}`
            : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${articles['C#'].length>0
            ? html`${articles['C#'].map(articleTemplate)}`
            : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${articles['Java'].length>0
            ? html`${articles['Java'].map(articleTemplate)}`
            : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${articles['Python'].length>0
            ? html`${articles['Python'].map(articleTemplate)}`
            : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
</section>`;

const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>
`;

export default async function homeView(context) {
    const data=await getRecentArticles();
    const articles={
        'JavaScript':data.filter(x=>x.category=='JavaScript'),
        'C#':data.filter(x=>x.category=='C#'),
        'Java':data.filter(x=>x.category=='Java'),
        'Python':data.filter(x=>x.category=='Python')
    }
    context.render(homeTemplate(articles));
}
