function add(num1) {
    let sum = 0;
    sum += num1;

    function aggregate(num2) {
        sum += num2;
        return aggregate;
    }
    aggregate.toString =()=>sum;
    return aggregate;
}
console.log(''+add(1))
console.log(''+add(1)(6)(-3))