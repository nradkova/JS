function attachEvents() {
    document.querySelector('#btnLoadPosts').addEventListener('click', getPosts);
}

attachEvents();

async function generatePost(data) {
    const id = document.querySelector('#posts').value;
    const post = Object.values(data).find(p => p.id === id);
    const comments = await getComments(id);
    document.querySelector('#post-title').textContent = post.title;
    document.querySelector('#post-body').textContent = post.body;
    const ul = document.querySelector('#post-comments');
    ul.innerHTML='';
    comments.forEach(e => {
        const li=document.createElement('li');
        li.id=e.id;
        li.textContent=e.text;
        ul.appendChild(li)
    })
}

async function getPosts(event) {
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const data = await response.json();
    const select = document.querySelector('#posts');
    select.innerHTML='';
    Object.values(data).forEach(e => {
        const option=document.createElement('option');
        option.value=e.id;
        option.textContent=e.title;
        select.appendChild(option);
    })
    document.querySelector('#btnViewPost').addEventListener('click', () => generatePost(data));
}

async function getComments(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const response = await fetch(url);
    const data = await response.json();
    return Object.values(data).filter(c => c.postId === postId);
}

