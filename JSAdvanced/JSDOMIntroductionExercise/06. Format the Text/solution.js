function result() {
  let sentences = document.querySelector('#input').value
    .split('.')
    .filter(x => x.length > 0);
    let result='';
    while(sentences.length>0){
     let paragraph=sentences.splice(0,3).join('.');
     result+=`<p>${paragraph+'.'}</p>`;
  }
  document.querySelector('#output').innerHTML=result;
}