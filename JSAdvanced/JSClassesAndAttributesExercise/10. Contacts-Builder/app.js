class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._online = false;
    };

    set online(value) {
        this._online = value;
        if (this.divTitle) {
            if(this._online){
                this.divTitle.classList.add('online');
            } else {
                this.divTitle.classList.remove('online');
            };
        };
    };

    get online() {
        return this._online;
    };

    render(id) {
        this.article = createCustomEl('article');
        
        this.divTitle = createCustomEl('div', `${this.firstName} ${this.lastName}`);
        this.divTitle.classList.add('title');
        this.button = createCustomEl('button', '&#8505');
        this.divTitle.appendChild(this.button);
        
        this.divInfo = createCustomEl('div');
        this.divInfo.classList.add('info');
        this.divInfo.style.display = 'none';
        this.divInfo.appendChild(createCustomEl('span', `&phone; ${this.phone}`));
        this.divInfo.appendChild(createCustomEl('span', `&#9993; ${this.email}`));
        
        this.article.appendChild(this.divTitle);
        this.article.appendChild(this.divInfo);
        
        const ref = document.getElementById(id);
        ref.appendChild(this.article);

        if (this._online) {
            this.divTitle.classList.add('online');
        } else {
            this.divTitle.classList.remove('online');
        };

        this.button.addEventListener('click', () => {
            if (this.divInfo.style.display === 'none') {
                this.divInfo.style.display = 'block';
            } else {
                this.divInfo.style.display = 'none';
            };
        });

        function createCustomEl(type, content) {
            let el = document.createElement(type);
            if (!content) { return el; }
            el.innerHTML = content;
            return el;
        };
    };
};

window.addEventListener('load', () => {
    let contacts = [
        new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
        new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
        new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
    ];
    contacts.forEach(c => c.render('main'));
    // After 1 second, change the online status to true
    setTimeout(() => contacts[1].online = true, 2000);
});