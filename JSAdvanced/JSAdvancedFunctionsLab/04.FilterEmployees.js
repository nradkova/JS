function solve(employees, criteria) {

    return JSON.parse(employees)
    .filter(e => filterBy(e, criteria))
    .map((e,index)=>format(e,index))
    .join('\n');

    function format(e,index) {
        return`${index}. ${e.first_name} ${e.last_name} - ${e.email}`
    }
    function filterBy(e, criteria) {
        let [prop, value] = criteria.split('-');
        return criteria === 'all'
            ? true
            : e[prop] === value
    }
}
console.log(solve(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    //'all'));
    'gender-Female'));