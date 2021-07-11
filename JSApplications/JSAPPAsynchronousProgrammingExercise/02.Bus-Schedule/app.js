function solve() {
    const stop = { id: 'depot' };
    const info = document.querySelector('#info span');
    const depBtn = document.querySelector('#depart');
    const arrBtn = document.querySelector('#arrive');

    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.id;
        const response = await fetch(url);
        const data = await response.json();
        stop.id = data.next;
        stop.name = data.name;
        info.textContent = 'Next stop ' + stop.name;
        depBtn.disabled = true;
        arrBtn.disabled = false;
    }

    function arrive() {
        info.textContent = 'Arriving at ' + stop.name;
        depBtn.disabled = false;
        arrBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();