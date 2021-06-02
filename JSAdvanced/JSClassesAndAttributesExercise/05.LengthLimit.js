class Stringer {
    constructor(str, limit) {
        this.innerString = str;
        this.innerLength = limit;
    };
    
    increase(value) {
        this.innerLength += value;
    };
    decrease(value) {
        value > this.innerLength
            ? this.innerLength = 0
            : this.innerLength -= value;
    };
    toString(){
        if(this.innerLength<this.innerString.length){
            return this.innerString.slice(0,-this.innerLength)+'...';
        }
        return this.innerString;
    };
};

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); // Test

