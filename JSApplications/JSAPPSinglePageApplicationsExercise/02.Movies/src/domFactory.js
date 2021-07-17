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

export function create(type, attributes, ...content) {
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