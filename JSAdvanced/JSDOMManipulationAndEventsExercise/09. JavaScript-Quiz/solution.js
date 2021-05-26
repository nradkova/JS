function solve() {
  const sections = document.querySelectorAll('body section');
  const resultField = document.querySelector('.results-inner h1');
  const answers = {
    1: 'onclick',
    2: 'JSON.stringify()',
    3: 'A programming API for HTML and XML documents'
  };
  let rightAnswers = 0;

  document.querySelector('#quizzie').addEventListener('click', onClick);
  
  function onClick(event) {
    if (event.target.className !== 'answer-text') {
      return;
    }
    const parent = event.target.parentNode.parentNode.parentNode.parentNode;
    Array.from(sections).forEach((s, index) => {
      if (parent === s) {
        if (event.target.textContent === answers[index + 1]) {
          rightAnswers++;
        }

        s.style.display='none';

        if (index < sections.length - 1) {
          sections[index + 1].style.display='block';

        } else {
          resultField.textContent = rightAnswers === 3
            ? 'You are recognized as top JavaScript fan!'
            : `You have ${rightAnswers} right answers`
          resultField.parentNode.parentNode.style.display = 'block';
        }
      }
    })
  }
}
