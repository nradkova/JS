function solve() {
   const form = document.querySelector('form')
   const [autorTag, titleTag, categoryTag, contentTag] = Array.from(form.querySelectorAll('p :nth-child(2)'));

   document.querySelector('.site-content').addEventListener('click', onClick);

   function onClick(event) {
      event.preventDefault();
      if (event.target.className === 'btn create') {
         createFunc();
      }
      if (event.target.className === 'btn delete') {
         delFunc(event.target);
      }
      if (event.target.className === 'btn archive') {
         archFunc(event.target);
      }
   }

   function createFunc() {
      const article = createCustomEl('article');
      const h1=createCustomEl('h1', titleTag.value);

      const pCategory = createCustomEl('p', 'Category: ');
      pCategory.appendChild(createCustomEl('strong', categoryTag.value));

      const pCreator = createCustomEl('p', 'Creator: ');
      pCreator.appendChild(createCustomEl('strong', autorTag.value));

      const pContent = createCustomEl('p', contentTag.value);
      
      const div = createCustomEl('div');
      div.classList.add('buttons');
      const delBtn = createCustomEl('button', 'Delete',['btn', 'delete'])
      div.appendChild(delBtn);
      const arcBtn = createCustomEl('button', 'Archive',['btn', 'archive'])
      div.appendChild(arcBtn);

      [h1,pCategory, pCreator, pContent, div].forEach(t => article.appendChild(t));
      [autorTag, titleTag, contentTag, categoryTag].forEach(t => t.value = '');
     
      document.querySelector('main section').appendChild(article);
   }

   function delFunc(target) {
      target.parentNode.parentNode.remove();
   }
   
   function archFunc(target) {
      const article = target.parentNode.parentNode;
      const articleName = article.firstChild.textContent;
      const ol = document.querySelector('.archive-section ol');
      ol.appendChild(createCustomEl('li', articleName));
      const liArr = Array.from(ol.children)
               .sort((a, b) => a.textContent.localeCompare(b.textContent));
      ol.innerHTML = '';
      liArr.forEach(l => ol.appendChild(l));
      document.querySelector('main section').removeChild(article);
   }

   function createCustomEl(type, content,classArr) {
      let el = document.createElement(type);
      if (content) {
         type === 'input' || type === 'textarea'
            ? el.value = content
            : el.textContent = content;
      }
      if (classArr) {
         el.classList.add(...classArr);
      }
      return el;
   }
};