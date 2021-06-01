function notify(message) {
  const notifyTag = document.querySelector('#notification');
  notifyTag.textContent = message;
  notifyTag.style.display = 'block';
  
  notifyTag.addEventListener('click', ()=>{
    notifyTag.style.display = 'none';
  });
}