import { render } from '../node_modules/lit-html/lit-html.js';
import api from './data.js'
import mainTemplate from './layout.js';

let books = [];
const context = {
    loadBooks,
    onClick,
}

start();

function start() {
    document.body.addEventListener('submit', onSubmit);
    attachContent([]);
}

function attachContent(books, bookToEdit) {
    const result = mainTemplate(context, books, bookToEdit);
    render(result, document.body);
}

async function loadBooks() {
    books = await api.getAllBooks();
    attachContent(books);
}

async function onClick(event) {
    if (event.target.id == 'editBtn') {
        const id = event.target.parentNode.parentNode.dataset.id;
        const book = await api.getBookById(id);
        attachContent(books, book);
    }
    if (event.target.id == 'delBtn') {
        const id = event.target.parentNode.parentNode.dataset.id;
        const confirmed = confirm('Book info will be deleted!');
        if (!confirmed) {
            return;
        }
        await api.deleteBookById(id);
        books= books.filter(b=>b._id!=id);
        attachContent(books);
    }
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    if(book.title==''||book.author==''){
        alert('All fields are required!')
        return;
    }
    
    if (event.target.id == 'add-form') {
        books.push(await api.createBook(book));
        attachContent(books);
        event.target.reset();
    }
    if (event.target.id == 'edit-form') {
        const id = formData.get('_id');
        const confirmed = confirm('Book info will be modified!');
        if (!confirmed) {
            return;
        }
        await api.editBookById(book, id);
        attachContent(await api.getAllBooks());
        event.target.reset();
    }
}
