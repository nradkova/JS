function search() {
   const search = document.querySelector('#searchText').value;
   let matchesCount = 0;
   const entries = Array.from(document.querySelectorAll('li'))
      .map(entry => {
         if (entry.textContent.toLowerCase().includes(search.toLowerCase())) {
            entry.style.fontWeight = 'bold';
            entry.style.textDecoration = 'underline'
            matchesCount++;
         } else {
            entry.style.fontWeight = '';
            entry.style.textDecoration = ''
         }
      });
   document.querySelector('#result').textContent = `${matchesCount} matches found`;
}
