class Company {
    constructor() {
        this.departments = [];
    };
    
    addEmployee(name, salary, position, department) {
        if ([name, salary, position, department].some(x => !x)) {
            throw new Error('Invalid input!');
        };
        if (salary < 0) {
            throw new Error('Invalid input!');
        };
     
        if (!this.departments.some(x => x.depId === department)) {
            this.departments.push({
                depId: department,
                employees: [],
                totalSalaries: 0
            });
        };
      
        this.departments.forEach(x => {
            if (x.depId === department) {
                x.employees.push({ name, salary, position });
                x.totalSalaries += salary;
            };
        });
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    };

    bestDepartment() {
        let bestSalary = 0;
        let bestDepartment = undefined;

        this.departments.forEach(x => {
            x.avgSalary = x.totalSalaries / x.employees.length;
            if (x.avgSalary > bestSalary) {
                bestDepartment = x;
                bestSalary = x.avgSalary;
            }
        });

        let result = `Best Department is: ${bestDepartment.depId}\nAverage salary: ${bestDepartment.avgSalary.toFixed(2)}\n`;
       
        bestDepartment.employees
            .sort((a, b) => b.salary - a.salary||a.name.localeCompare(b.name))
            .forEach(e => {
                result += `${e.name} ${e.salary} ${e.position}\n`;
            })
        return result.trim();
    };
};

let c = new Company();
c.addEmployee("Stanimir", 2000.1111, "engineer", "Construction");
c.addEmployee("Pesho", 1500.2222, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());

