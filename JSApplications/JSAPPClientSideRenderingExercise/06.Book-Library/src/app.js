import { render } from '../node_modules/lit-html/lit-html.js';
import api from './data.js'
import mainTemplate from './layout.js';

start();

function start() {
    document.body.addEventListener('click', loadBooks);
    document.body.addEventListener('submit', onSubmit);
    attachContent([]);
}

function attachContent(books, bookToEdit) {
    const result = mainTemplate(books, bookToEdit);
    render(result, document.body);
}

async function loadBooks(event) {
    if (event.target.id == 'loadBooks') {
        event.preventDefault();
        const books = await api.getAllBooks();
        attachContent(books);
    }
    if (event.target.id == 'editBtn') {
        const id = event.target.parentNode.parentNode.dataset.id;
        const book = await api.getBookById(id);
        const books = await api.getAllBooks();
        attachContent(books, book);
    }
    if (event.target.id == 'delBtn') {
        const id = event.target.parentNode.parentNode.dataset.id;
        const confirmed=confirm('Book info will be deleted!');
        if(!confirmed){
            return;
        }
        await api.deleteBookById(id);
        attachContent([]);
    }
}

async function onSubmit(event) {
    if (event.target.id == 'add-form') {
        event.preventDefault();
        const formData = new FormData(event.target);
        const book = {
            title: formData.get('title'),
            author: formData.get('author')
        }
       
        await api.createBook(book);
        const books = Object.values(await api.getAllBooks());
        attachContent([]);
        event.target.reset();
    }
    if (event.target.id == 'edit-form') {
        event.preventDefault();
        const formData = new FormData(event.target);
        const book = {
            title: formData.get('title'),
            author: formData.get('author')
        }
        const id=formData.get('_id');
        const confirmed=confirm('Book info will be modified!');
        if(!confirmed){
            return;
        }
        await api.editBookById(book,id);
        attachContent([]);
        event.target.reset();
    }
}