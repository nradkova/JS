import { create } from './domFactory.js'
import { request } from './reguestFactory.js'

let parent;
let section;
let postId;

export function setupComments(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
}

export async function showComments(id) {
    postId = id;
    parent.innerHTML = '';
    parent.appendChild(section);
    section.innerHTML = 'Loading...';

    const topic = await getTopicRequest(id);
    section.innerHTML = '';
    section.appendChild(createSectionStructurePreview(topic));

    const container = section.querySelector('#allComments')
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createHeaderPreview(topic));

    const comments = await getAllCommentsRequest(postId)
    Object
        .values(comments)
        .forEach(e => {
            if (e.postId == postId) {
                fragment.appendChild(createCommentPreview(e))
            }
        });

    container.appendChild(fragment);
}

async function postComment(event) {
    event.preventDefault();
    const textTag = section.querySelector('#comment');
    const userTag = section.querySelector('#username');

    if (textTag.value == '' || userTag.value == '') {
        return alert('All fields are required!')
    }
    
    const comment = {
        postText: textTag.value,
        username: userTag.value,
        createdOn: new Date().toGMTString(),
        postId
    }
    await postCommentRequest(comment);

    [textTag, username].forEach(e => e.value = '');
    showComments(postId);
}

function createSectionStructurePreview(topic) {
    return create('div', { className: 'container' },
        create('div', { className: 'theme-content' },
            create('div', { className: 'theme-title' },
                create('div', { className: 'theme-name-wrapper' },
                    create('div', { className: 'theme-name' },
                        create('h2', {}, topic.topicName)))),
            create('div', { className: 'comment', id: 'allComments' }),
            create('div', { className: 'answer-comment' },
                create('p', {},
                    create('span', {}, 'currentUser'), ' comment:'),
                create('div', { className: 'answer' },
                    create('form', {},
                        create('textarea', { name: 'postText', id: 'comment', cols: '30', rows: '10' }),
                        create('div', {},
                            create('label', { for: 'username' }, 'Username',
                                create('span', { className: 'red' }, '*'),
                                create('input', { type: 'text', name: 'username', id: 'username' }),
                                create('button', { onClick: postComment }, 'Post'))))))));
}

function createHeaderPreview(topic) {
    return create('div', { className: 'header' },
        create('img', { src: './static/profile.png', alt: 'avatar' }),
        create('p', {},
            create('span', {}, topic.username),
            ' posted on ',
            create('time', {}, topic.createdOn)),
        create('p', { className: 'post-content' }, topic.postText))
}

function createCommentPreview(comment) {
    return create('div', { id: 'user-comment' },
        create('div', { className: 'topic-name-wrapper' },
            create('div', { className: 'topic-name' },
                create('p', {},
                    create('strong', {}, comment.username),
                    ' commented on ',
                    create('time', {}, comment.createdOn)),
                create('div', { className: 'post-content' },
                    create('p', {}, comment.postText)))));
}

async function getAllCommentsRequest() {
    return await request('http://localhost:3030/jsonstore/collections/myboard/comments')
}

async function getTopicRequest(id) {
    return await request('http://localhost:3030/jsonstore/collections/myboard/posts/' + id)
}

async function postCommentRequest(comment) {
    return await request('http://localhost:3030/jsonstore/collections/myboard/comments',
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        })
}