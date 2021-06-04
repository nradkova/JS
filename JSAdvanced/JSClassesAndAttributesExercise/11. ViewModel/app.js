class Textbox {
    constructor(selector, regex) {
        this._selector = selector;
        this._invalidSymbols = regex;
        this._value = undefined;
        this._elements=Textbox._verifySelector(selector);
    };

    set value(str) {
        this._value = str;
        if (this._elements.length > 0) {
            this._elements.forEach(x => x.value = str);
        };
    };

    get value() {
        return this._value;
    };

    get elements() {
        return this._elements;
    };

    isValid() {
        return this._invalidSymbols.test(this._value) ? false : true;
    };

    static _verifySelector(selector) {
        const selected = document.querySelectorAll(selector);
        if (selected) {
            return Array.from(selected)
        }
        return [];
    };
};

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('textbox')
textbox.value = "Tesst";
console.log(inputs[0])

