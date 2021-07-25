export function setupHome(section, nav) {
  section.querySelector('a').addEventListener('click',(event)=>{
      event.preventDefault();
      nav.goTo('dashboard');
  })
    return showHome;

    function showHome() {
        return section;
    }
}