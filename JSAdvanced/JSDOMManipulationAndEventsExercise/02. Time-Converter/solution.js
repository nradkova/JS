function attachEventsListeners() {
   document.querySelector('main').addEventListener('click', onClick);
   const entries = Array
      .from(document.querySelectorAll('div'))
      .map(div => div.querySelector('input'));

   function onClick(event) {
      const mousePosition = event.target;

      if (mousePosition.id === 'daysBtn'
         || mousePosition.id === 'hoursBtn'
         || mousePosition.id === 'minutesBtn'
         || mousePosition.id === 'secondsBtn') {

         const input = mousePosition.parentNode.children[1];
         convert(input);
      }
   }

   function convert(source) {
      const sourceValue = source.value;
      if (source.id === 'days') {
         entries[1].value = sourceValue * 24;
         entries[2].value = sourceValue * 24 * 60;
         entries[3].value = sourceValue * 24 * 60 * 60;
      }
      if (source.id === 'hours') {
         entries[0].value = sourceValue / 24;
         entries[2].value = sourceValue * 60;
         entries[3].value = sourceValue * 60 * 60;
      }
      if (source.id === 'minutes') {
         entries[0].value = sourceValue / 24 / 60;
         entries[1].value = sourceValue / 60;
         entries[3].value = sourceValue * 60;
      }
      if (source.id === 'seconds') {
         entries[0].value = sourceValue / 24 / 60 / 60;
         entries[1].value = sourceValue / 60 / 60;
         entries[2].value = sourceValue / 60;
      }
   }
}