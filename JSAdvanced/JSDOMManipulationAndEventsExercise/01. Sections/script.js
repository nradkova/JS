function create(words) {
   const parent=document.querySelector('#content');
   words.forEach(word => {
      const div=document.createElement('div');
      const p=document.createElement('p');
      p.textContent=word;
      p.style.display='none';
      div.appendChild(p);
      parent.appendChild(div);
      
      div.addEventListener('click',(event)=>{
         event.target.children[0].style.display='block';
      });

   });
}