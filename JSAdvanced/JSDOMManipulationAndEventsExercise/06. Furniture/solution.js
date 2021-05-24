function solve() {
  const buttons = document.querySelectorAll('#container button');
  const generateBtn = buttons[0];
  const buyBtn = buttons[1];

  document.querySelector('#container').addEventListener('click', onClick);

  function onClick(event) {
    if (event.target === generateBtn) {
      const inputData = JSON.parse(generateBtn.previousElementSibling.value);
      processData(inputData);
      Array
        .from(document.querySelectorAll('input[type="checkbox"]'))
        .map(input => input.disabled = false);
    }

    if (event.target === buyBtn) {
      const selected = Array
        .from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(input => input.checked)
        .map(input => input.parentNode.parentNode);

      let furniture = [];
      let price = 0;
      let avgDecor = 0;
      selected.forEach(s => {
        furniture.push(s.children[1].textContent.trim());
        price += Number(s.children[2].textContent);
        avgDecor += Number(s.children[3].textContent) / selected.length;
      });

      let result = `Bought furniture: ${furniture.join(', ')}\nTotal price: ${price.toFixed(2)}\nAverage decoration factor: ${avgDecor}`;
      buyBtn.previousElementSibling.value = result;
    }
  }

  function processData(inputData) {
    const parent = document.querySelector('tbody');
    inputData.forEach(data => {
      const row = document.createElement('tr');
      appendRowElements(row, data);
      parent.appendChild(row);
    });
  }

  function appendRowElements(row, data) {
    row.appendChild(createTdElement('img', '', ['src', data.img]));
    row.appendChild(createTdElement('p', data.name));
    row.appendChild(createTdElement('p', data.price));
    row.appendChild(createTdElement('p', data.decFactor));
    row.appendChild(createTdElement('input', '', ['type', 'checkbox']));
  }

  function createTdElement(type, text, attribute) {
    const td = document.createElement('td');
    const el = document.createElement(type);
    el.textContent = text;
    if (attribute) {
      el.setAttribute(attribute[0], attribute[1]);
      type === 'input' ? el.disabled = true : '';
    }
    td.appendChild(el)
    return td;
  }
}
