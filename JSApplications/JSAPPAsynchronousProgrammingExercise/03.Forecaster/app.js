function attachEvents() {
    document.querySelector('#submit').addEventListener('click', generateForecast);

    async function generateForecast() {
        const forecastDiv = document.querySelector('#forecast');
        const currentDiv = forecastDiv.querySelector('#current');
        const upcomingDiv = forecastDiv.querySelector('#upcoming');
        forecastDiv.style.display = "inline";
        setBlankDispaly(currentDiv);
        setBlankDispaly(upcomingDiv);
        try {
            const location = await getLocation();
            if (!location) {
                throw new Error();
            }
            const todayInfo = await getToday(location);
            const upcomingInfo = await getUpcoming(location);
            currentDiv.appendChild(createPreviewToday(todayInfo, symbol));
            upcomingDiv.appendChild(createPreviewUpcomming(upcomingInfo, symbol));
        } catch (error) {
            currentDiv.appendChild(customEl('span', {}, 'Error'));
            upcomingDiv.appendChild(customEl('span', {}, 'Error'));
        }
    }
}
attachEvents();

function createPreviewUpcomming(info, symbol) {
    const element = customEl('div', { className: 'forecast-info' });
    info.forecast.forEach(f => {
        const span=customEl('span', { className: 'upcoming' },
                                customEl('span', { className: 'symbol' }),
                                customEl('span', { className: 'forecast-data' }, f.low + '/' + f.high),
                                customEl('span', { className: 'forecast-data' }, f.condition));
        span.querySelector('.symbol').innerHTML = symbol[f.condition];
        element.appendChild(span);
    });
    return element;
}

function createPreviewToday(info, symbol) {
    const element = customEl('div', { className: 'forecasts' },
        customEl('span', { className: 'condition symbol' }),
        customEl('span', { className: 'condition' },
            customEl('span', { className: 'forecast-data' }, info.name),
            customEl('span', { className: 'forecast-data' }, info.forecast.low + '/' + info.forecast.high),
            customEl('span', { className: 'forecast-data' }, info.forecast.condition)));
    element.querySelector('.condition.symbol').innerHTML = symbol[info.forecast.condition];
    return element;
}

async function getLocation() {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const response = await fetch(url);
    const data = await response.json();
    const input = document.querySelector('#location').value;
    const location = data.find(location => location.name === input);
    return location;
}

async function getToday(location) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getUpcoming(location) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const symbol = {
    'Sunny': '&#x2600',
    'Partly sunny': '&#x26C5',
    'Overcast': '&#x2601',
    'Rain': '&#x2614',
    'Degrees': '&#176'
}

function setBlankDispaly(element) {
    Array.from(element.children).forEach((e, i) => {
        if (i !== 0) {
            e.remove();
        }
    })
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