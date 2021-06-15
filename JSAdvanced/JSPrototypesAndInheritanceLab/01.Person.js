class Person{
    constructor(firstName, lastName){
        this._firstName=firstName;
        this._lastName=lastName;
    };
    set firstName(value){
        this._firstName=value;
    };
    get firstName(){
        return this._firstName;
    };
    set lastName(value){
        this._lastName=value;
    };
    get lastName(){
        return this._lastName;
    };
    set fullName(input){
        let[first,last]=input.split(' ');
        if(first&&last){
            this._fullName=input;
            this._firstName=first;
            this._lastName=last;
        }
    };
    get fullName(){
        return this._firstName+' '+this._lastName
    };
};
let person = new Person("Peter", "Ivanov");
console.log(person.fullName); //Peter Ivanov
person.firstName = "George";
console.log(person.fullName); //George Ivanov
person.lastName = "Peterson";
console.log(person.fullName); //George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName); //Nikola
console.log(person.lastName); //Tesla
