class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
        this._count = 0;
    }
    addCar(carModel, carNumber) {
        if (this._count >= this.capacity) {
            throw new Error("Not enough parking space.")
        }
        this.vehicles.push({
            carModel,
            carNumber,
            payed: false
        });
        this._count++;
        return `The ${carModel}, with a registration number ${carNumber}, parked.`;
    }
    removeCar(carNumber) {
        const found = this.vehicles.find(c => c.carNumber === carNumber);
        if (!found) {
            throw new Error("The car, you're looking for, is not found.");
        }
        if (!found.payed) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }
        this.vehicles.splice(this.vehicles.indexOf(found), 1);
        this._count--;
        return `${carNumber} left the parking lot.`;
    }
    pay(carNumber) {
        const found = this.vehicles.find(c => c.carNumber === carNumber);
        if (!found) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
        if (found.payed) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        found.payed = true;
        return `${carNumber}'s driver successfully payed for his stay.`;
    }
    getStatistics(carNumber){
        if(carNumber){
            const found = this.vehicles.find(c => c.carNumber === carNumber);
            return `${found.carModel} == ${found.carNumber} - ${found.payed ?'Has payed' : 'Not payed'}`;
        }
        let result=`The Parking Lot has ${this.capacity-this._count} empty spots left.\n`;
        this.vehicles
        .sort((a,b)=>a.carModel.localeCompare(b.carModel))
        .forEach(c=>{
            result+=`${c.carModel} == ${c.carNumber} - ${c.payed ?'Has payed' : 'Not payed'}\n`;
        })
        return result.trimEnd();
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
