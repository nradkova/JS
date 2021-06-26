function addDestination() {
    const destinations = document.querySelector('#destinationsList');
    const [cityTag, countryTag, seasonTag] = document.querySelectorAll('#input :nth-child(even)');
    const [city, country] = [cityTag.value, countryTag.value];
    const season = seasonTag.options[seasonTag.selectedIndex].text;
    
    if (city !== '' && country !== '') {
        console.log([seasonTag])
        console.log('sss' + season)
        add();
    }

    cityTag.value = '';
    countryTag.value = '';
    seasonTag.innerHTML += seasonTag.options[0].text;
   
    function add() {
        const seasonFormatted = `${season[0].toUpperCase()}${season.slice(1)}`
        const trEl = createCustomEl('tr');
        trEl.appendChild(createCustomEl('td', city + ', ' + country));
        trEl.appendChild(createCustomEl('td', seasonFormatted));
        destinations.appendChild(trEl);

        const seasonValues =Array.from( document.querySelectorAll('#summaryBox input'));
        seasonValues.forEach(s => {
            if (seasonFormatted === s.previousElementSibling.textContent.slice(0, -1)) {
                s.value++;
            }
        })
    }

    function createCustomEl(type, content, classArr) {
        let el = document.createElement(type);
        if (content) {
            type === 'input' || type === 'textarea'
                ? el.value = content
                : el.textContent = content;
        }
        if (classArr) {
            el.classList.add(...classArr);
        }
        return el;
    }
}