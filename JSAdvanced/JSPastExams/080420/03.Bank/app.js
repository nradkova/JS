class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }
    newCustomer(customer) {
        const found = this.allCustomers.find(c => c.personalId === customer.personalId);
        if (found) {
            throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
        }

        let customerObj = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            personalId: customer.personalId,
            totalMoney: 0,
            transaction: []
        }
        this.allCustomers.push(customerObj);

        return customer;
    }
    depositMoney(personalId, amount) {
        const found = this.allCustomers.find(c => c.personalId === personalId);
        if (!found) {
            throw new Error(`We have no customer with this ID!`);
        }

        found.totalMoney += amount;
        found.transaction.push(['deposit', amount]);

        return `${found.totalMoney}$`;
    }
    withdrawMoney(personalId, amount) {
        const found = this.allCustomers.find(c => c.personalId === personalId);
        if (!found) {
            throw new Error(`We have no customer with this ID!`);
        }

        if (found.totalMoney < amount) {
            throw new Error(`${found.firstName} ${found.lastName} does not have enough money to withdraw that amount!`);
        }

        found.totalMoney -= amount;
        found.transaction.push(['withdraw', amount]);
        
        return `${found.totalMoney}$`;
    }
    customerInfo(personalId) {
        const found = this.allCustomers.find(c => c.personalId === personalId);
        if (!found) {
            throw new Error(`We have no customer with this ID!`);
        }

        let count = found.transaction.length;
        let info = found.transaction
            .reverse()
            .map((t, i) => {
                if (t[0] === 'deposit') {
                    return `${count - i}. ${found.firstName} ${found.lastName} made deposit of ${t[1]}$!`;
                }
                return `${count - i}. ${found.firstName} ${found.lastName} withdrew ${t[1]}$!`;
            })
            .join('\n');

        return `Bank name: ${this._bankName}
Customer name: ${found.firstName} ${found.lastName}
Customer ID: ${found.personalId}
Total Money: ${found.totalMoney}$
Transactions:\n${info}`;
    }
}

let bank = new Bank('SoftUni Bank');
console.log(bank.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: 'Mihaela', lastName: 'Mileva', personalId: 4151596 }));
bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);
console.log(bank.withdrawMoney(6233267, 125));
console.log(bank.customerInfo(6233267));

let bank1 = new Bank('aa');
bank1.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 1111111 });
bank1.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 1111111 });
