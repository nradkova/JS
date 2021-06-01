function validate() {
    const form = document.querySelector('#registerForm');
    const [nameTag,
        emailTag,
        passTag,
        passConfirmTag,
        companyInfoTag,
        companyNumberTag] = Array.from(form.querySelectorAll('div input'));
    const companyInfoField = companyNumberTag.parentNode.parentNode;

    document.querySelector('body').addEventListener('click', onClick);

    function onClick(event) {
        event.preventDefault();
        const username = nameTag.value;
        const email = emailTag.value;
        const password = passTag.value;
        const passwordConfirm = passConfirmTag.value;

        if (event.target.id === 'submit') {
            let areAllValid = true;

            if (!(/(^[a-zA-Z0-9]{3,20}$)/g).test(username)) {
                nameTag.style.borderColor = 'red';
                areAllValid = false;
            } else {
                nameTag.style.borderColor = '';
            };

            if (!(/^(.+@(.+)?\.(.+)?)$/g).test(email)) {
                emailTag.style.borderColor = 'red';
                areAllValid = false;
            } else {
                emailTag.style.borderColor = '';
            };
           
            let isvalidPassword = false;
            if (!(/^\w{5,15}$/g).test(password)) {
                passTag.style.borderColor = 'red';
                areAllValid = false;
            } else {
                passTag.style.borderColor = '';
                isvalidPassword = true;
            };

            if (!isvalidPassword || passwordConfirm !== password) {
                passConfirmTag.style.borderColor = 'red';
                areAllValid = false;
            } else {
                passConfirmTag.style.borderColor = '';
            };

            if (companyInfoField.style.display === 'block') {
                if (companyNumberTag.value >= 1000 && companyNumberTag.value <= 9999) {
                    companyNumberTag.style.borderColor = '';
                } else {
                    companyNumberTag.style.borderColor = 'red';
                    areAllValid = false;
                };
            };

            const validTag = document.querySelector('#valid');
            if (areAllValid) {
                validTag.style.display = 'block';
            } else {
                validTag.style.display = 'none';
            };
        };

        if (event.target.id === 'company') {
            if (companyInfoField.style.display === 'none'
                || companyInfoField.style.display === '') {
                companyInfoField.style.display = 'block';
            } else {
                companyInfoField.style.display = 'none';
            };
        };
    };
};