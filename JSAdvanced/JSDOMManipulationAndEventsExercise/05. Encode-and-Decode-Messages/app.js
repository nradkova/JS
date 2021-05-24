function encodeAndDecodeMessages() {
    const buttons = document.querySelectorAll('div button');
    const textareas = document.querySelectorAll('div textarea');
   
    document.querySelector('main').addEventListener('click', onClick);

    function onClick(event) {
        if (event.target === buttons[0]) {
            textareas[1].value = textareas[0].value
                .split('')
                .map(x => x = String.fromCharCode(x.charCodeAt(0) + 1))
                .join('');
            textareas[0].value = '';
            return;
        }
        if (event.target === buttons[1]) {
            textareas[1].value = textareas[1].value
                .split('')
                .map(x => x = String.fromCharCode(x.charCodeAt(0) - 1))
                .join('');
            return;
        }
    }
}