class List {
    constructor() {
        this.array = [];
        this.size = 0;
    };
    add(number) {
        if (typeof number !== 'number') {
            throw new Error;
        }
        this.size++;
        this.array.push(number);
        this.array.sort((a, b) => a - b);
    };
    remove(index) {
        if (typeof index !== 'number' || index < 0 || index >= this.array.length) {
            throw new Error;
        }
        this.size--;
        this.array.splice(index, 1);
    };
    get(index) {
        if (typeof index !== 'number' || index < 0 || index >= this.array.length) {
            throw new Error;
        }
        return this.array[index];
    };
};

let list = new List();
list.add(5);
console.log(list.get(0));
list.add(3);
console.log(list.get(0));
list.remove(0);
console.log(list.get(0));
console.log(list.hasOwnProperty('size'));