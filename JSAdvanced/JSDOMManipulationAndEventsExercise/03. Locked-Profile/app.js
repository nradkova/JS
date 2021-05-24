function lockedProfile() {
    document.querySelector('main').addEventListener('click', onClick);

    function onClick(event) {
        if (event.target.tagName === 'BUTTON') {
            const button = event.target;
            const lockedInput = event.target.parentNode.querySelector('input[value="lock"]');
           
            if (lockedInput.checked) {
                return;
            }
            
            const div = event.target.parentNode.querySelector('div');
            if(div.style.display==='none'||div.style.display===''){
                div.style.display = 'block'; 
                button.textContent='Hide it';

            }else{
                div.style.display = 'none';
                button.textContent='Show more';
            }
        }
    }
}