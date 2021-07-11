async function getInfo() {
    const inputId = document.querySelector('#stopId');
    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + inputId.value;
    const stopName = document.querySelector('#stopName');
    const ul = document.querySelector('#buses');
    ul.innerHTML = '';
    try {
        const response = await fetch(url);
        const data = await response.json();

        stopName.textContent = data.name;
        Object.entries(data.buses)
            .forEach(([busId, time]) => ul.appendChild(customEl('li', {}, `Bus ${busId} arrives in ${time}`, customEl('span'))));

        inputId.value = '';
    } catch (error) {
        stopName.textContent = 'Error';
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
    });
    content
        .reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), [])
        .forEach(a => {
            if (typeof a == 'string' || typeof a == 'number') {
                element.appendChild(document.createTextNode(a));
            } else {
                element.appendChild(a);
            }
        });
    return element;
}