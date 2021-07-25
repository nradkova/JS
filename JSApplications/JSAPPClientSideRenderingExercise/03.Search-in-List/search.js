import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns as data } from './towns.js';

const towns = data.map(t => {
   return {
      'name': t,
      'active': false
   }
});

const townsListTemplate = (towns, matches = -1) => html`
<article>
   <div id="towns">
      <ul>
         ${towns.map(t => html`<li class=${t.active ? 'active' : '' }>${t.name}</li>`)}
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button @click=${search}>Search</button>
   <div id="result" .textContent=${matchResultFormatter(matches)}></div>
</article>`;


const body = document.querySelector('body');
const templateResult = townsListTemplate(towns);

render(templateResult, body);

function search(event) {
   const input = event.target.parentNode.querySelector('#searchText').value.toLocaleLowerCase();
   let matches = 0;
   towns.forEach(t => {
      if (t.name.toLocaleLowerCase().includes(input) && input != '') {
         matches++;
         t.active = true;
      } else {
         t.active = false;
      }
   });
   const templateResult = townsListTemplate(towns, matches);
   render(templateResult, body);
   event.target.parentNode.querySelector('#searchText').value = '';
}

function matchResultFormatter(matches) {
   if (matches < 0) {
      return '';
   }
   if (matches == 0) {
      return 'No matches found';
   }
   return matches == 1 ? matches + ' match found' : matches + ' matches found';
}

