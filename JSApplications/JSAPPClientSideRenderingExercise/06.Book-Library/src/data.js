const api = {
    getAllBooks,
    getBookById,
    deleteBookById,
    createBook,
    editBookById
}
export default api;

const endpoint = 'http://localhost:3030/jsonstore/collections/books';

async function getAllBooks() {
    const data = await request(endpoint);
    return Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }));
}

async function getBookById(id) {
    return await request(endpoint + '/' + id);
}

async function deleteBookById(id) {
    return await request(endpoint + '/' + id, {
        method: 'delete'
    });
}

async function createBook(book) {
    return await request(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
}

async function editBookById(book, id) {
    return await request(endpoint + '/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
}

async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok) {
        return await response.json();
    }
    const error = await response.json();
    return alert(error.message);
}

