function solve() {
    const juniorTasks = [
        ' is working on a simple task.']
    const seniorTasks = [
        ' is working on a complicated task.',
        ' is taking time off work.',
        ' is supervising junior workers.'];
    const managerTasks = [
        ' scheduled a meeting.',
        ' is preparing a quarterly report.'];

    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error('Canot instantiate correctly.')
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }
        work() {
            let task = this.tasks.shift();
            console.log(this.name + task);
            this.tasks.push(task);
        }
        collectSalary() {
            console.log(`${this.name} received ${this.getFinalSalary()} this month.`);
        }
        getFinalSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age)
            this.tasks = juniorTasks;
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age)
            this.tasks = seniorTasks;
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age)
            this.tasks = managerTasks;
            this.dividend = 0;
        }
        getFinalSalary() {
            return this.salary + this.dividend;
        }
    }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}

let result = solve();
var first = new result.Junior('Peter', 27);
first.salary = 1200;
first.collectSalary();
first.work();
first.work();
var second = new result.Senior('Peter', 27);
second.salary = 1200;
second.collectSalary();
second.work();
second.work();
