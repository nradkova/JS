function getArticleGenerator(articles) {
   const div=document.querySelector('#content');
   let index=0;

   return function(){
       const article=document.createElement('article');
       if(index<articles.length){
           article.textContent=articles[index];
           div.appendChild(article);
           index++;
       };
   };
};
