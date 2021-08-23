//88/100

window.addEventListener('load', solve);

function solve() {
    const modelTag = document.querySelector('#model');
    const yearTag = document.querySelector('#year');
    const descriptionTag = document.querySelector('#description');
    const priceTag = document.querySelector('#price');
    const storeContainer = document.querySelector('.store');
    const infoContainer = document.querySelector('#furniture-list');

    storeContainer.addEventListener('click', onClick);
    let totalPrice = 0;
    const furniture = {};

    function onClick(event) {
        event.preventDefault();
        if (event.target.id === 'add') {
            furniture.model = modelTag.value;
            furniture.year = Number(yearTag.value);
            furniture.description = descriptionTag.value;
            furniture.price = Number(priceTag.value);
            if (furniture.model == '' || furniture.year < 0 || furniture.description == '' || furniture.price <0) {
                return;
            }
            createPreview(furniture);
            [modelTag, yearTag, descriptionTag, priceTag].forEach(x => x.value = '');
        }
        if (event.target.textContent === 'More Info') {
            document.querySelector('.hide').style.display = 'contents';
            event.target.textContent = 'Less Info';
            return;
        }
        if (event.target.textContent === 'Less Info') {
            document.querySelector('.hide').style.display = 'none';
            event.target.textContent = 'More Info';
        }
        if (event.target.className === 'buyBtn') {
            event.target.parentNode.parentNode.remove();
            totalPrice += Number(furniture.price.toFixed(2));
            document.querySelector('.total-price').textContent = totalPrice;
        }
    }

    function createPreview(furniture) {
        const trInfo = createCustomEl('tr', null, 'info');
        trInfo.appendChild(createCustomEl('td', furniture.model));
        trInfo.appendChild(createCustomEl('td', furniture.price.toFixed(2)));
        const tdBtns=createCustomEl('td');
        tdBtns.appendChild(createCustomEl('button','More Info','moreBtn'));
        tdBtns.appendChild(createCustomEl('button','Buy it','buyBtn'));
        trInfo.appendChild(tdBtns);
        const trHide = createCustomEl('tr', null, 'hide');
        trHide.appendChild(createCustomEl('td', `Year: ${furniture.year}`));
        const descTd=createCustomEl('td',`Description: ${furniture.description}`);
        trHide.appendChild(descTd);
        descTd.setAttribute('colspan', 3);
        infoContainer.appendChild(trInfo);
        infoContainer.appendChild(trHide)
    }

    function createCustomEl(type, content, classArr) {
        let el = document.createElement(type);
        if (content) {
            type === 'input' || type === 'textarea'
                ? el.value = content
                : el.textContent = content;
        }
        if (classArr) {
            el.classList.add(classArr);
        }
        return el;
    }
}
