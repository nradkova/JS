function solve() {
   const body = document.querySelector('body');
   const form = document.querySelector('form')
   const [autorTag, titleTag, categoryTag, contentTag] = form.querySelectorAll('p :nth-child(2)');

   document.querySelector('button.create').addEventListener('click', createFunc);

   function createFunc(event) {
      event.preventDefault();

      const article = createCustomEl('article');
      article.appendChild(createCustomEl('h1', titleTag.value));

      const categoryEl = createCustomEl('p', 'Category: ');
      categoryEl.appendChild(createCustomEl('strong', categoryTag.value));
      article.appendChild(categoryEl);

      const creatorEl = createCustomEl('p', 'Creator: ');
      creatorEl.appendChild(createCustomEl('strong', autorTag.value));
      article.appendChild(creatorEl);

      article.appendChild(createCustomEl('p', contentTag.value));
      const div = createCustomEl('div');
      div.classList.add('buttons');
      article.appendChild(div);

      const delBtn = createCustomEl('button', 'Delete')
      delBtn.classList.add('btn', 'delete');
      const arcBtn = createCustomEl('button', 'Archive')
      arcBtn.classList.add('btn', 'archive');
      div.appendChild(delBtn);
      div.appendChild(arcBtn);

      document.querySelector('main section').appendChild(article);
      autorTag.value = '';
      titleTag.value = '';
      contentTag.value = '';
      categoryTag.value = '';

      delBtn.addEventListener('click', deleteFunc);
      arcBtn.addEventListener('click', archiveFunc);
   }
   function deleteFunc(event) {
      event.target.parentNode.parentNode.remove();
   }
   function archiveFunc(event) {
      const article = event.target.parentNode.parentNode;
      const articleName = article.firstChild.textContent;

      const ol = document.querySelector('.archive-section ol');
      ol.appendChild(createCustomEl('li', articleName));

      const liArr = Array.from(ol.children)
            .sort((a, b) => a.textContent.localeCompare(b.textContent));
      ol.innerHTML = '';
      liArr.forEach(l => ol.appendChild(l));

      document.querySelector('main section').removeChild(article);
   }

   function createCustomEl(type, content) {
      let el = document.createElement(type);
      if (!content) { return el; }
      type === 'input' || type === 'textarea'
         ? el.value = content
         : el.textContent = content;
      return el;
   };
};

