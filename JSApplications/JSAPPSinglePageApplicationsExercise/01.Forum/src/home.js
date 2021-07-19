import { create } from './domFactory.js'
import { request } from './reguestFactory.js'
import { showComments } from './comment.js'

let parent;
let section;
let container;

export function setupHome(parentTarget, sectionTarget) {
    parent = parentTarget;
    section = sectionTarget;
    container = section.querySelector('#allTopics');
    section.querySelector('#createTopic').addEventListener('click', postNewTopic);
}

export async function showHome() {
    parent.innerHTML = '';
    parent.appendChild(section);
    container.innerHTML = 'Loading...';

    const data = await getAllTopicsRequest();
    const fragment = document.createDocumentFragment();
    Object
        .values(data)
        .map(createTopicPreview)
        .forEach(e => fragment.appendChild(e));
    container.innerHTML = '';
    container.appendChild(fragment);
}

async function postNewTopic(event) {
    event.preventDefault();

    if (event.target.tagName == 'BUTTON') {
        const topicTag = section.querySelector('#topicName');
        const userTag = section.querySelector('#username');
        const postTag = section.querySelector('#postText');

        if (event.target.className == 'public') {
            if (topicTag.value == '' || userTag.value == '' || postTag.value == '') {
                return alert('All fields are required!')
            }
            const topic = {
                topicName: topicTag.value,
                username: userTag.value,
                postText: postTag.value,
                createdOn: new Date().toGMTString()
            }
            await postTopicRequest(topic);
            showHome();

        } else {
            const confirmed = confirm('Topic will not be posted!');
            if (!confirmed) {
                return;
            }
        }
        [topicName, username, postText].forEach(e => e.value = '');
    }
}

function createTopicPreview(topic) {
    return create('div', { className: 'topic-container', 'data-id': topic._id },
        create('div', { className: 'topic-name-wrapper' },
            create('div', { className: 'topic-name' }),
            create('a', { href: '#', className: 'normal', onClick: () => showComments(topic._id) },
                create('h2', {}, topic.topicName),
                create('div', { className: 'columns' },
                    create('div', {},
                        create('p', {}, 'Date:',
                            create('time', {}, topic.createdOn)),
                        create('div', { className: 'nick-name' },
                            create('p', {}, 'Username: ',
                                create('span', {}, topic.username))))))));
}

async function getAllTopicsRequest() {
    return await request('http://localhost:3030/jsonstore/collections/myboard/posts')
}

async function postTopicRequest(topic) {
    return await request('http://localhost:3030/jsonstore/collections/myboard/posts',
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(topic)
        })
}

