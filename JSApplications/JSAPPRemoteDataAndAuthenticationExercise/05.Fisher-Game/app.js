let userId = undefined;
function attachEvents() {
    document.querySelector('#catches').innerHTML='';
    document.querySelector('button.load').addEventListener('click', () => {
        const token = sessionStorage.getItem('userToken');
        if (token != null) {
            const addBtn = document.querySelector('button.add');
            addBtn.disabled = false;
            addBtn.addEventListener('click', addCatch);
        }
        loadCatches();
    });
}
attachEvents();
async function addCatch(event) {
    event.preventDefault();
    const token = sessionStorage.getItem('userToken');
    const inputFields = event.target.parentNode.querySelectorAll('input');
    const entry = {
        angler: inputFields[0].value,
        weight: inputFields[1].value,
        species: inputFields[2].value,
        location: inputFields[3].value,
        bait: inputFields[4].value,
        captureTime: inputFields[5].value
    }
    userId = await postReguestCatch(entry, token);
    console.log(userId)
    inputFields.forEach(e => e.value = '');
    loadCatches();
}

async function updateCatch(event) {
    event.preventDefault();
    const id = event.target.parentNode['data-id'];
    const token = sessionStorage.getItem('userToken');
    const ownerId = event.target.parentNode['data-ownerId'];
    if (ownerId != userId) {
       return alert('You are not creator of this catch!')
    }
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
        await putRequestCatch(entry, token, id);
    }
    loadCatches();
}

async function deleteCatch(event) {
    const id = event.target.parentNode['data-id'];
    const ownerId = event.target.parentNode['data-ownerId'];
    const token = sessionStorage.getItem('userToken');
    if (ownerId != userId) {
      return  alert('You are not creator of this catch!')
    }
    const confirmed = confirm('Catch will be no longer available!')
    if (confirmed) {
        await deleteRequestCatch(id, token);
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
    const token = sessionStorage.getItem('userToken');
    if (token == null) {
        return;
    }
    document.querySelectorAll('.update').forEach(e => e.disabled = false);
    document.querySelectorAll('.delete').forEach(e => e.disabled = false);
}

function previewCatch(entry) {
    return create('div', { className: 'catch', 'data-id': entry._id, 'data-ownerId': entry._ownerId },
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
        create('button', { disabled: true, className: 'update', onClick: updateCatch }, 'Update'),
        create('button', { disabled: true, className: 'delete', onClick: deleteCatch }, 'Delete'));
}

async function putRequestCatch(entry, token, id) {
    return await request('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(entry)
    })
}

async function deleteRequestCatch(id, token) {
    return await request('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': token
        }
    })
}
async function postReguestCatch(entry, token) {
    const data = await request('http://localhost:3030/data/catches ', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(entry)
    })
    return data._ownerId;
}

async function getRequestCatches() {
    return await request('http://localhost:3030/data/catches');
}

async function request(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }
    return await response.json();
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