import { html, render } from './node_modules/lit-html/lit-html.js';

const endpoint = 'http://localhost:3030/jsonstore/advanced/table';
const container = document.querySelector('tbody');
const inputField = document.querySelector('#searchField');

const rowTemplate = (data, hasMatch) => html`
<tr class=${hasMatch ? 'select' : ''}>
   <td .textContent=${data.firstName + ' ' + data.lastName}></td>
   <td .textContent=${data.email}></td>
   <td .textContent=${data.course}></td>
</tr>`;

start();

async function start() {
   document.querySelector('#searchBtn').addEventListener('click', () => onClick(students));
   const students = Object.values(await getStudents());
   attachContent(students);
}

function attachContent(students) {
   const result = students.map(s => rowTemplate(s, hasMatch(Object.values(s).slice(0, 4))));
   render(result, container)
}

function onClick(students) {
   if (inputField.value == '') {
      return;
   }
   attachContent(students);
   inputField.value = '';
}

function hasMatch(studentData) {
   if (inputField.value == '') {
      return false;
   }
   let matchesCount = studentData.filter(p => p.toLowerCase().includes(inputField.value.toLowerCase())).length;
   const result = matchesCount > 0 ? true : false;
   return result;
}

async function getStudents() {
   const response = await fetch(endpoint);
   if (response.ok) {
      return await response.json();
   }
}



