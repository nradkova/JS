document.querySelector('.cube-list').addEventListener('click', (event) => {
    if (event.target.textContent == 'SHOW MORE') {
        event.target.parentNode.querySelector('.cube-description').style.display = "block";
        event.target.textContent = 'SHOW LESS';
        return;
    }
    if (event.target.textContent == 'SHOW LESS') {
        event.target.parentNode.querySelector('.cube-description').style.display = "none";
        event.target.textContent = 'SHOW MORE';
        return;
    }});