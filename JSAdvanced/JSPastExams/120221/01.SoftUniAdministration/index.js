function solve() {
    const form = document.querySelector('form');
    const [lectureTag, dateTag, moduleTag] = form.querySelectorAll('div>:nth-child(2)');
    document.querySelector('.container').addEventListener('click', onClick);
    console.log(moduleTag.value)

    function onClick(event) {
        if (event.target.parentNode.className === 'form-control' && event.target.tagName === 'BUTTON') {
            if (lectureTag.value === '' || dateTag.value === '' || moduleTag.value === 'Select module') {
                return;
            }
            event.preventDefault();
            addFunc();
            [lectureTag, dateTag].forEach(x => x.value = '');
            moduleTag.value = 'Select module';
        }
        if (event.target.className === 'red') {
            delFunc(event.target);
        }
    }

    function delFunc(target) {
        const refactoredUl = target.parentNode.parentNode;
        if (refactoredUl.children.length === 1) {
            refactoredUl.parentNode.remove();
        } else {
            target.parentNode.remove();
        }
    }

    function addFunc() {
        const liEl = createCustomEl('li', undefined, ['flex']);
        const dateFormatted = dateTag.value.split('-').join('/').replace('T', ' - ');
        const content = `${lectureTag.value} - ${dateFormatted}`;
        liEl.appendChild(createCustomEl('h4', content));
        liEl.appendChild(createCustomEl('button', 'Del', ['red']));

        const moduleName = `${moduleTag.value.toUpperCase()}-MODULE`;
        const modulesDiv = document.querySelector('.modules');
        const existingModules = Array.from(modulesDiv.children);

        const found = existingModules.find(m => m.querySelector('h3').textContent === moduleName);
        if (!found) {
            const div = createCustomEl('div', undefined, ['module']);
            div.appendChild(createCustomEl('h3', moduleName));
            const newUl = createCustomEl('ul');
            newUl.appendChild(liEl);
            div.appendChild(newUl);
            modulesDiv.appendChild(div);
            return;
        }

        const ul = found.querySelector('ul');
        ul.appendChild(liEl);
        
        Array
            .from(ul.children)
            .sort((a, b) => {
                a.date = a.querySelector('h4').textContent.split(' - ')[1];
                b.date = b.querySelector('h4').textContent.split(' - ')[1];
                return a.date.localeCompare(b.date);
            })
            .forEach(li => ul.appendChild(li));
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
};