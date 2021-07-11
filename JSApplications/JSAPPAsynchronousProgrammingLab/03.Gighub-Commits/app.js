function loadCommits() {
    const ul = document.querySelector('#commits');
    const username = document.querySelector('#username').value;
    const repo = document.querySelector('#repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
   
    fetch(url)
        .then(response => {
            if (response.status >= 300) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            ul.innerHTML = '';
            data.forEach(element => {
                ul.appendChild(createCustomEl('li', `${element.commit.author.name}: ${element.commit.message}`));
            });
        })
        .catch((err) => {
            ul.innerHTML = '';
            ul.appendChild(createCustomEl('li', `Error: ${err.message} (Not Found)`));
        });

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