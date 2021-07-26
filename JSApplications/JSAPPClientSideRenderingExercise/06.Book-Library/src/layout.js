import { html } from '../node_modules/lit-html/lit-html.js';

const rowTemplate = (book) => html`
<tr data-id=${book._id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button id="editBtn">Edit</button>
        <button id="delBtn">Delete</button>
    </td>
</tr>`;

const tableTemplate = (context,books) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody @click=${context.onClick}>
        ${books ? books.map(rowTemplate):''}
    </tbody>
</table>
`;

const editFormTemplate =(book)=>  html`
<form id="edit-form">
    <input type="hidden" name="_id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>
`;

const addFormTemplate =  html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>
`;

const mainTemplate = (context,books, bookToEdit) => html`
<button @click=${context.loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
${tableTemplate(context,books)}
${bookToEdit ? editFormTemplate(bookToEdit) : addFormTemplate}
`;

export default mainTemplate;
