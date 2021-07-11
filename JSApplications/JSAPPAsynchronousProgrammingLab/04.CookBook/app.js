async function loadRecipes() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const response = await fetch(url);
    const data = await response.json();
    const main = document.querySelector('main');
    main.innerHTML = '';
    Object.values(data).forEach(rec => {
        const article = customEl('article', undefined, ['preview']);
        const divTitle = customEl('div', undefined, ['title']);
        divTitle.appendChild(customEl('h2', rec.name));
        const divSmall = customEl('div', undefined, ['small']);
        divSmall.appendChild(customEl('img', undefined, undefined, { src: rec.img }));
        article.appendChild(divTitle);
        article.appendChild(divSmall);
        main.appendChild(article);
        article.addEventListener('click',  () => toggleRecipes(article, rec._id));
    });
}
async function toggleRecipes(article, id) {
    const url = 'http://localhost:3030/jsonstore/cookbook/details/' + id;
    console.log(id)
    console.log(article)

    const response = await fetch(url);
    const data = await response.json();
    article.innerHTML = '';

    article.appendChild(customEl('h2', data.name))
    const divBand = customEl('div', undefined, ['band']);
    article.appendChild(divBand);

    const divThumb = customEl('div', undefined, ['small']);
    divThumb.appendChild(customEl('img', undefined, undefined, { src: data.img }));

    const divIngr = customEl('div', undefined, ['ingredients']);
    divIngr.appendChild(customEl('h3', 'Ingredients:'));
    const ul = customEl('ul');
    data.ingredients.forEach(i => ul.appendChild(customEl('li', i)));
    divIngr.appendChild(ul);

    divBand.appendChild(divThumb);
    divBand.appendChild(divIngr);

    const divDesc = customEl('div', undefined, ['description']);
    divDesc.appendChild(customEl('h3', 'Preparation:'));
    data.steps.forEach(s => divDesc.appendChild(customEl('p', s)));
    article.appendChild(divDesc);

}
function customEl(type, content, classArr, attrObj) {
    let el = document.createElement(type);
    if (content) {
        el.appendChild(document.createTextNode(content));
    }
    if (classArr) {
        el.classList.add(...classArr);
    }
    if (attrObj) {
        Object.entries(attrObj).forEach(([key, value]) => el[key] = value);
    }
    return el;
}
window.addEventListener('load', () => {
    loadRecipes();
})