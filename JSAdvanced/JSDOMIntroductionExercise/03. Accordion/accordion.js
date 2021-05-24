function toggle() {
    let button = document.getElementsByClassName('button')[0];
    let entry = document.querySelector('#extra');

    button.textContent = button.textContent === 'More'
        ? 'Less'
        : 'More';

    button.textContent === 'More'
        ? entry.style.display = 'none'
        : entry.style.display = 'block';
}