function start() {
    const table = document.querySelector('table>tbody');
    table.innerHTML = '';
    document.querySelector('#loadBooks').addEventListener('click', loadBooks);
    document.querySelector('#submit-form').addEventListener('click', createBook);
    document.querySelector('#edit-form').style.display = 'none';
}
start();

async function loadBooks() {
    const books = await getRequestBooks();
    const table = document.querySelector('table>tbody');
    table.innerHTML = '';
    Object.entries(books)
        .map(previewBook)
        .forEach(e => table.appendChild(e));
}

async function createBook(event) {
    event.preventDefault();
    if (event.target.tagName === "BUTTON") {
        const form = event.target.parentNode;
        const titleTag = form.querySelector('[name="title"]');
        const authorTag = form.querySelector('[name="author"]');
        if (titleTag.value == '' || authorTag.value == '') {
            alert('All fields are required')
            throw new Error();
        }
        await postRequestBook({ title: titleTag.value, author: authorTag.value });
        titleTag.value = '';
        authorTag.value = '';
        loadBooks();
    }
}

async function editBook(event) {
    const id = event.target.parentNode.parentNode['data-id'];
    document.querySelector('#submit-form').style.display = 'none';
    const editForm = document.querySelector('#edit-form');
    editForm.style.display = 'block';
    
    editForm.addEventListener('click',async(event)=>{
        if (event.target.tagName === "BUTTON") {
            event.preventDefault();
            console.log(event.target)
            const titleTag = editForm.querySelector('[name="title"]');
            const authorTag = editForm.querySelector('[name="author"]');
            if (titleTag.value == '' || authorTag.value == '') {
                alert('All fields are required')
                throw new Error();
            }
            const confirmed=confirm('Book info will be modified!')
            if(confirmed){
                await putRequestBook({ title: titleTag.value, author: authorTag.value },id);
            }
            titleTag.value = '';
            authorTag.value = '';
            loadBooks();
            document.querySelector('#submit-form').style.display = 'block';
            editForm.style.display = 'none';
        }
    })
}

async function deleteBook(event) {
   const id = event.target.parentNode.parentNode['data-id'];
   const confirmed=confirm('Book will be no longer available!')
   if(confirmed){
       await deleteRequestBook(id);
   }
    loadBooks();
}

function previewBook([id, info]) {
    return create('tr', { 'data-id': id },
        create('td', {}, info.title),
        create('td', {}, info.author),
        create('td', {},
            create('button', { onClick: editBook }, 'Edit'),
            create('button', { onclick: deleteBook }, 'Delete')));
}

async function request(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }
    return await response.json();
}

async function getRequestBooks() {
    return await request('http://localhost:3030/jsonstore/collections/books');
}

async function postRequestBook(book) {
    return await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: book.author, title: book.title })
    })
}

async function putRequestBook(book, id) {
    return await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: book.author, title: book.title })
    })
}

async function deleteRequestBook(id) {
    return await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    })
}

function create(type, attributes, ...content) {
    const element = document.createElement(type);
    Object.entries(attributes || {}).forEach(([key, value]) => {
        if (key.substring(0, 2) == 'on') {
            element.addEventListener(key.substring(2).toLowerCase(), value);
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