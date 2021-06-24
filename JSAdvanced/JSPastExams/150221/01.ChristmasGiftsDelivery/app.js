function solution() {
    const [addTag, listTag, sendTag, discardTag] = document.querySelectorAll('section');
    document.querySelector('.card button').addEventListener('click', addFunc);

    function addFunc(event) {
        event.preventDefault();

        const liEl = createCustomEl('li', event.target.previousElementSibling.value);
        const sendBtn = createCustomEl('button', 'Send');
        sendBtn.id = 'sendButton';
        liEl.appendChild(sendBtn);
        const discardBtn = createCustomEl('button', 'Discard');
        discardBtn.id = 'discardButton';
        liEl.appendChild(discardBtn);
        
        sendBtn.addEventListener('click', sendFunc);
        discardBtn.addEventListener('click', discardFunc);

        const listUl = listTag.querySelector('ul');
        const listUlItems = Array.from(listUl.children)
        listUlItems.push(liEl);
        listUl.innerHTML = '';
        listUlItems
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach(i => listUl.appendChild(i));
            
        addTag.querySelector('input').value = '';
    }

    function sendFunc(event) {
        const el = event.target.parentNode;
        sendTag.querySelector('ul').appendChild(createCustomEl('li', el.textContent.slice(0, -11)));
        console.log([el])
        el.remove();
    }
    function discardFunc(event) {
        const el = event.target.parentNode;
        discardTag.querySelector('ul').appendChild(createCustomEl('li', el.textContent.slice(0, -11)));
        el.remove();
    }

    function createCustomEl(type, content) {
        let el = document.createElement(type);
        if (!content) { return el; }
        type === 'input' || type === 'textarea'
            ? el.value = content
            : el.textContent = content;
        return el;
    };
}