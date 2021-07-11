function loadRepos() {
	const ul=document.querySelector('#repos');
    const username=document.querySelector('#username').value;
    const url=`https://api.github.com/users/${username}/repos`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        ul.innerHTML='';
        data.forEach(element => {
            const li=createCustomEl('li');
            const a=createCustomEl('a',element.full_name);
            a.href=element.html_url;
            li.appendChild(a);
            ul.appendChild(li);
        });
    })

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