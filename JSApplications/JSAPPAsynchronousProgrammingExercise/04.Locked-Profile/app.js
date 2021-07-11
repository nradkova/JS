async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.querySelector('main');
    main.innerHTML = '';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    Object.values(data).forEach(e => main.appendChild(generateProfile(e)));
}

function generateProfile(e) {
    const div = customEl('div', { className: 'profile' },
        customEl('img', { src: "./iconProfile2.png", className: 'userIcon' }),
        customEl('label', {}, 'Lock'),
        customEl('input', { type: 'radio', name: 'user1Locked', value: 'lock', checked: true }),
        customEl('label', {}, 'Unlock'),
        customEl('input', { type: 'radio', name: 'user1Locked', value: 'unlock' }),
        customEl('br'),
        customEl('hr'),
        customEl('label', {}, 'Username'),
        customEl('input', { type: 'text', name: 'user1Locked', value: e.username, disabled: true, readonly: true }),
        customEl('div', { id: 'user1HiddenFields' },
            customEl('hr'),
            customEl('label', {}, 'Email:'),
            customEl('input', { type: 'email', name: 'user1Email', value: e.email, disabled: true, readonly: true }),
            customEl('label', {}, 'Age:'),
            customEl('input', { type: 'number', name: 'user1Age', value: e.age, disabled: true, readonly: true })),
        customEl('button', { onClick: showDetails }, 'Show more'));
    return div;
}

function showDetails(event) {
    const div = event.target.parentNode;
    const button=event.target;
    if (div.querySelector('input[value="unlock"]').checked && button.textContent==='Show more') {
        div.querySelector('#user1HiddenFields').style.display='inline';
        button.textContent='Hide it';
        return;
    }
    if (div.querySelector('input[value="unlock"]').checked && button.textContent==='Hide it') {
        div.querySelector('#user1HiddenFields').style.display='';
        button.textContent='Show more';
        return;
    }
}

function customEl(type, attributes, ...content) {
    const element = document.createElement(type);
    Object.entries(attributes || {}).forEach(([key, value]) => {
        if (key.substring(0, 2) == 'on') {
            element.addEventListener(key.substring(2).toLocaleLowerCase(), value);
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