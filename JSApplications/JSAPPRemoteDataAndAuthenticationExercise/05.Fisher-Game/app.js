function attachEvents() {
    document.querySelector('#catches').innerHTML = '';
    const token = sessionStorage.getItem('userToken');
    if (token) {
        const addBtn = document.querySelector('button.add');
        addBtn.disabled = false;
        addBtn.addEventListener('click', addCatch);
        
        const logoutBtn = document.querySelector('[href="login.html"]');
        logoutBtn.textContent = 'Logout';
        logoutBtn.addEventListener('click', logout);
    }
    document.querySelector('button.load').addEventListener('click', loadCatches);
}
attachEvents();

async function addCatch(event) {
    event.preventDefault();
    const inputFields = event.target.parentNode.querySelectorAll('input');
    const entry = {
        angler: inputFields[0].value,
        weight: inputFields[1].value,
        species: inputFields[2].value,
        location: inputFields[3].value,
        bait: inputFields[4].value,
        captureTime: inputFields[5].value
    }
    await postReguestCatch(entry);
    inputFields.forEach(e => e.value = '');
    loadCatches();
}

async function updateCatch(event) {
    event.preventDefault();
    const id = event.target.parentNode['data-id'];
    const inputFields = event.target.parentNode.querySelectorAll('input');
    const entry = {
        angler: inputFields[0].value,
        weight: inputFields[1].value,
        species: inputFields[2].value,
        location: inputFields[3].value,
        bait: inputFields[4].value,
        captureTime: inputFields[5].value
    }
    const confirmed = confirm('Catch info will be modified!')
    if (confirmed) {
        await putRequestCatch(entry, id);
    }
    loadCatches();
}

async function deleteCatch(event) {
    const id = event.target.parentNode['data-id'];
    const confirmed = confirm('Catch will be no longer available!')
    if (confirmed) {
        await deleteRequestCatch(id);
    }
    loadCatches();
}

async function loadCatches() {
    const catches = await getRequestCatches();
    const div = document.querySelector('#catches');
    div.innerHTML = '';
    catches
        .map(previewCatch)
        .forEach(e => div.appendChild(e));
}

function previewCatch(entry) {
    const result = create('div', { className: 'catch', 'data-id': entry._id },
        create('label', {}, 'Angler'),
        create('input', { type: 'text', className: 'angler', value: entry.angler }),
        create('hr'),
        create('label', {}, 'Weight'),
        create('input', { type: 'number', className: 'weight', value: entry.weight }),
        create('hr'),
        create('label', {}, 'Species'),
        create('input', { type: 'text', className: 'species', value: entry.species }),
        create('hr'),
        create('label', {}, 'Location'),
        create('input', { type: 'text', className: 'location', value: entry.location }),
        create('hr'),
        create('label', {}, 'Bait'),
        create('input', { type: 'text', className: 'bait', value: entry.bait }),
        create('hr'),
        create('label', {}, 'Capture Time'),
        create('input', { type: 'number', className: 'captureTime', value: entry.captureTime }),
        create('hr'),
        create('button', { className: 'update', onClick: updateCatch }, 'Update'),
        create('button', { className: 'delete', onClick: deleteCatch }, 'Delete'));
    result
        .querySelectorAll('button')
        .forEach(e => sessionStorage.getItem('userId') === entry._ownerId ? e.disabled = false : e.disabled = true)
    return result;
}
async function logout(event) {
    event.preventDefault();
    await logoutRequest();
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    event.target.textContent = 'Login';
    location.assign('./index.html');
}

async function putRequestCatch(entry, id) {
    return await request('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify(entry)
    })
}

async function deleteRequestCatch(id) {
    return await request('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': sessionStorage.getItem('userToken')
        }
    })
}

async function postReguestCatch(entry) {
    return await request('http://localhost:3030/data/catches ', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify(entry)
    })
}

async function getRequestCatches() {
    return await request('http://localhost:3030/data/catches');
}

async function logoutRequest() {
    return await request('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 
            'X-Authorization': sessionStorage.getItem('userToken') 
        }
    });
}

async function request(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }
    if(!url.includes('logout')){
        return await response.json();
    }
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