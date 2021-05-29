function solve() {
    const body = document.querySelector('body');
    const form = document.querySelector('#container');
    const [nameTag, hallTag, priceTag] = Array.from(form.children);
    const moviesList = document.querySelector('#movies ul');
    const archiveList = document.querySelector('#archive ul');

    body.addEventListener('click', onClick);

    const processor = {
        onscreen: onScreenFunc,
        archive: archiveFunc,
        delete: deleteFunc,
        clear: clearFunc
    };

    function onClick(event) {
        event.preventDefault();
        const command = event.target.textContent
            .split(' ')
            .join('')
            .toLowerCase();
        if (processor[command]) {
            processor[command](event.target);
        }
    }

    function clearFunc(currentBtn) {
        currentBtn.previousElementSibling.innerHTML = '';
    }

    function deleteFunc(currentBtn) {
        const li = currentBtn.parentNode;
        li.remove();
    }

    function archiveFunc(currentBtn) {
        const li = currentBtn.parentNode.parentNode;

        const name = li.firstChild.textContent;
        const price = Number(li.children[2].firstChild.textContent);
        const soldTickets = Number(li.children[2].children[1].value);
        if (isNaN(soldTickets)) {
            return;
        }

        const toArchive = createCustomEl('li');
        toArchive.appendChild(createCustomEl('span', name));
        toArchive.appendChild(createCustomEl('strong', `Total amount: ${(price * soldTickets).toFixed(2)}`));
        toArchive.appendChild(createCustomEl('button', 'Delete'));

        archiveList.appendChild(toArchive);
        moviesList.removeChild(li);
    }

    function onScreenFunc() {
        let name = nameTag.value;
        let hall = hallTag.value;
        let price = Number(priceTag.value);

        if (!areValid(name, hall, price)) {
            return;
        }
        nameTag.value = '';
        hallTag.value = '';
        priceTag.value = '';

        const movie = createMovie(name, hall, price);
        moviesList.appendChild(movie);
    }

    function areValid(name, hall, price) {
        if (name === '' || hall === '' || !price) {
            return false;
        }
        if (name !== '' && hall !== '' && price === 0) {
            return true;
        }
        return true;
    }

    function createMovie(name, hall, price) {
        const li = createCustomEl('li');
        li.appendChild(createCustomEl('span', name));
        li.appendChild(createCustomEl('strong', `Hall: ${hall}`));

        const div = createCustomEl('div');
        div.appendChild(createCustomEl('strong', price.toFixed(2)));

        const input = createCustomEl('input');
        input.placeholder = 'Tickets Sold';
        div.appendChild(input);

        div.appendChild(createCustomEl('button', 'Archive'));
        li.appendChild(div);

        return li;
    }

    function createCustomEl(type, content) {
        let el = document.createElement(type);
        if (!content) { return el; }
        type === 'input'
            ? el.value = content
            : el.textContent = content;
        return el;
    }
}