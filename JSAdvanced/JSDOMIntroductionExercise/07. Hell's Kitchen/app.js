function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      const input = JSON.parse(document.querySelector('#inputs textarea').value);

      const restaurants = {};
      input.reduce((restaurants, current) => {
         let [name, ...workers] = current.split(' - ');
         workers = workers[0].split(', ');

         if (!restaurants[name]) {
            restaurants[name] = { workers };
         } else {
            restaurants[name].workers = restaurants[name].workers.concat(workers);
         }

         restaurants[name].workers = restaurants[name].workers
            .map(worker => {
               if (typeof worker === 'string') {
                  let [workerName, salary] = worker.split(' ');
                  salary = Number(salary);
                  return { workerName, salary };
               } else {
                  return worker;
               }
            })
            .sort((a, b) => b.salary - a.salary);

         restaurants[name].bestSalary = restaurants[name].workers[0].salary;
         restaurants[name].averageSalary = (restaurants[name].workers
            .reduce((a, b) => a + b.salary, 0)) / restaurants[name].workers.length;

         return restaurants;
      }, restaurants)

      let bestRest = {};
      let bestAverSalary = 0;
      Object.keys(restaurants).forEach(name => {
         if (restaurants[name].averageSalary > bestAverSalary) {
            bestAverSalary = restaurants[name].averageSalary;
            bestRest = restaurants[name];
            bestRest.name = name;
         }
      });

      document.querySelector('#bestRestaurant p').textContent =
         `Name: ${bestRest.name} Average Salary: ${bestRest.averageSalary.toFixed(2)} Best Salary: ${bestRest.bestSalary.toFixed(2)}`;

      let workersInfo = bestRest.workers
         .map(worker => `Name: ${worker.workerName} With Salary: ${worker.salary}`)
         .join(' ');
      document.querySelector('#workers p').textContent = workersInfo;
   }

}