function validate() {
    const emailTag = document.querySelector('#email');

    emailTag.addEventListener('change', () => {

        if ((/^[a-z]+@[a-z]+\.[a-z]+$/g).test(emailTag.value)) {
            emailTag.className = '';
        } else {
            emailTag.className = 'error';
        };
    });
};