function solve() {
    const buttons = document.querySelectorAll('button');
    buttons[0].addEventListener('click', check);
    buttons[1].addEventListener('click', clear);
    
    const rows = document.querySelectorAll('tbody tr');
    const table = document.querySelector('table');
    const outputField = document.querySelector('#check p');

    const defaultLineSum=6;
    const defaultLineLength=3;

    function check(event) {
        let isSolved = true;
       
        Array.from(rows).forEach(row => {
            const rowEntries = Array
                .from(row.children)
                .map(x => x.firstElementChild);
            if (!validateLine(rowEntries)) {
                isSolved = false;
                return;
            }
        });
        [0, 1, 2].forEach(index => {
            let colEntries = [];
            Array.from(rows).forEach(row => {
                const el = row.children[index].firstElementChild;
                colEntries.push(el);
            });
            if (!validateLine(colEntries)) {
                isSolved = false;
                return;
            }
        });
        if (isSolved) {
            table.style.border = '2px solid green';
            outputField.textContent = 'You solve it! Congratulations!';
            outputField.style.color = 'green';
        } else {
            table.style.border = '2px solid red';
            outputField.textContent = 'NOP! You are not done yet...';
            outputField.style.color = 'red';

        }
    }

    function clear(event) {
        Array.from(document.querySelectorAll('input')).map(x => x.value = '');
        table.style.border = '';
        outputField.textContent = '';
    }

    function validateLine(line) {
        const entries = line
            .map(x => Number(x.value))
            .filter(x => !isNaN(x));
        const entriesSum = entries.reduce((a, b) => a + b, 0);
        const entriesSet = new Set(entries);
        if ((entriesSum !== defaultLineSum)
            || (entriesSet.size !== defaultLineLength)) {
            return false;
        }
        return true
    }
}