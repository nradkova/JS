async function solution() {
    const main = document.querySelector('#main');
    const articles = await getArticles();
    articles.forEach(a => main.appendChild(generateArticle(a)));
}
solution();

function generateDetails(data) {
    return customEl('div', { className: 'extra' },
               customEl('p', {}, data.content));
}

function generateArticle(article) {
    const result = customEl('div', { className: 'accordion' },
        customEl('div', { className: 'head' },
            customEl('span', {}, article.title),
            customEl('button', { className: 'button', id: article._id, onClick: toggleDetails}, 'More')));
    return result;

    async function toggleDetails() {
        const button = result.querySelector('button');
        if (button.textContent === 'More') {
            const data = await getDetails(article._id);
            const details = generateDetails(data);
            result.appendChild(details);
            details.style.display = "inline";
            button.textContent = 'Less';
            return;
        }
        if (button.textContent === 'Less' && result.children[1]) {
            result.children[1].remove();
            button.textContent = 'More';
            return;
        }
    }
}

async function getArticles() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getDetails(id) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function customEl(type, attributes, ...content) {
    const element = document.createElement(type);
    Object.entries(attributes || {}).forEach(([key, value]) => {
        if (key.substring(0, 2) == 'on') {
            element.addEventListener(key.substring(2).toLocaleLowerCase(), value);
        } else {
            element[key] = value;
        }
    })
    content
        .reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), [])
        .forEach(a => {
            if (typeof a == 'string' || typeof a == 'number') {
                element.appendChild(document.createTextNode(a));
            } else {
                element.appendChild(a);
            }
        })
    return element;
}