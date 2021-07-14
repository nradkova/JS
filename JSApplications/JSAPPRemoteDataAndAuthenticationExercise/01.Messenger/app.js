function attachEvents() {
    loadMessages();
    document.querySelector('#submit').addEventListener('click', sendMessage);
    document.querySelector('#refresh').addEventListener('click', loadMessages);
}

attachEvents();

async function sendMessage() {
    const [authorTag, contentTag] = document.querySelectorAll('input');
    try {
        if(authorTag.value==''||contentTag.value==''){
            throw new Error('Cannot send message with no name or no text!');
        }
        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: authorTag.value, content: contentTag.value })
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        authorTag.value = '';
        contentTag.value = '';
        loadMessages();
    } catch (err) {
        alert(err.message);
    }
}

async function loadMessages() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        if (!response.ok) {
            throw new Error(await response.json());
        }
        const data = await response.json();
        const messages = Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n');
        document.querySelector('#messages').value = messages;
    } catch (err) {
        alert(err.message);
    }
}