function solve() {
  const entry = document.getElementById('text').value;
  const convention = document.getElementById('naming-convention').value;

  document.getElementById('result').textContent = modify(entry, convention);

  function modify(entry, convention) {

    const entryArr = entry.split(' ').map(x => x.toLowerCase());

    if (convention === 'Camel Case') {
      return entryArr.map((el, index) =>index === 0 ? el : el[0].toUpperCase() + el.slice(1))
      .join('');

    } else if (convention === 'Pascal Case') {
      return entryArr.map(el => el[0].toUpperCase() + el.slice(1))
        .join('');

    } else {
      return 'Error!';
    }
  }
}