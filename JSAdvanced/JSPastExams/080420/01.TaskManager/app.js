function solve() {
    const [add, open, inProgress, complete] = Array.from(document.querySelector('div').children);
    const [taskTag, descriptionTag, dateTag]=
        Array.from(add.children[1].children[0].children)
             .filter(x => x.tagName === 'INPUT' || x.tagName === 'TEXTAREA');

    const manager = {
        addFunc,
        startFunc,
        deleteFunc,
        finishFunc
    };

    document.querySelector('div').addEventListener('click', (event) => {
        event.preventDefault();
        const command = event.target.textContent.toLowerCase() + 'Func';
        if (manager[command]){
             manager[command](event.target);
        }
    })

    function finishFunc(currentBtn) {
        const article = currentBtn.parentNode.parentNode;
        complete.children[1].appendChild(article);
        currentBtn.parentNode.remove();
    }

    function deleteFunc(currentBtn) {
        currentBtn.parentNode.parentNode.remove();
    }

    function startFunc(currentBtn) {
        const article = currentBtn.parentNode.parentNode;
        inProgress.children[1].appendChild(article);
        const [first, second] = Array.from(article.querySelectorAll('button'));

        first.textContent = 'Delete';
        first.classList.remove('green');
        first.classList.add('red');

        second.textContent = 'Finish';
        second.classList.remove('red');
        second.classList.add('orange');
    }

    function addFunc(currentBtn) {
        const form = currentBtn.parentNode;
        if (taskTag.value === ''
            || descriptionTag.value === ''
            || dateTag.value === '') {
            return;
        }
        const [task,description,date]=[taskTag.value,descriptionTag.value,dateTag.value];
        [taskTag,descriptionTag,dateTag].forEach(t =>t.value='');
        
        const article = createArticle(task, description, date);
        open.children[1].appendChild(article);
    }

    function createArticle(task, description, date) {
        const article = createCustomEl('article');
        article.appendChild(createCustomEl('h3', task));
        article.appendChild(createCustomEl('p', `Description: ${description}`));
        article.appendChild(createCustomEl('p', `Due Date: ${date}`));

        const div = createCustomEl('div',undefined,['flex']);
        article.appendChild(div);

        const stBtn = createCustomEl('button', 'Start',['green']);
        div.appendChild(stBtn);

        const delBtn = createCustomEl('button', 'Delete',['red']);
        div.appendChild(delBtn);

        return article;
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