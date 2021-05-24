function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const entries = document.querySelectorAll('tbody tr');

   function onClick() {
      let search = document.querySelector('#searchField').value;

      Array.from(entries).map(row => {
         if (row.textContent.toLowerCase().includes(search.toLowerCase())) {
            row.setAttribute('class', 'select');
         } else {
            row.removeAttribute('select')
         }
      })
   }
}