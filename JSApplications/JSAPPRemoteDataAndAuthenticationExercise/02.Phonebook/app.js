function attachEvents() {
    document.querySelector('#btnCreate').addEventListener('click', async () => {
        const personTag = document.querySelector('#person');
        const phoneTag = document.querySelector('#phone');
        await postContact(personTag.value, phoneTag.value);
        personTag.value = '';
        phoneTag.value = '';
    })
    
    document.querySelector('#btnLoad').addEventListener('click', async () => {
        const contacts = await getContacts();
        const phoneBook= document.querySelector('#phonebook');
        phoneBook.innerHTML='';
        Object.entries(contacts).map(([id, info]) => {
           phoneBook.appendChild(createContact(id, info));
        })
    })
}

attachEvents();

function createContact(id, info) {
    const result = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    result.appendChild(span);
    result.appendChild(delBtn);
    span.textContent = info.person + ':' + info.phone;
    delBtn.textContent='Delete';
    delBtn.addEventListener('click',removeEntry);

    return result;

    async function removeEntry(){
        await deleteContact(id);
        result.remove();
    }
}

async function postContact(person, phone) {
    try {
        if (person == '' || phone == '') {
            throw new Error('Cannot create contact with no name or no number!');
        }
        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
    } catch (err) {
        alert(err.message);
    }
}

async function getContacts() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook')
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}

async function deleteContact(id) {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete'
        })
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}