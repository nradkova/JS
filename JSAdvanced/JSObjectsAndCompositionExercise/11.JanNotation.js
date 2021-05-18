function solve(input) {
    const operators = input.filter(x => typeof x === 'string');
    const numbers = input.filter(x => typeof x === 'number');
    if (numbers.length <= operators.length) {
        return 'Error: not enough operands!';
    }
    if (numbers.length - 1 > operators.length) {
        return 'Error: too many operands!';
    }

    let result = 0;
    let index = 0;
    while (input.length>1) {
        let operator = input[index];
        if(index<2||typeof operator==='number'){
            index++;
            continue;
        }
        if (typeof operator==='string'){
            let num1=input[index-2];
            let num2=input[index-1];
            if(operator==='+'){
                result=num1+num2;
            }
            if(operator==='-'){
                result=num1-num2;
            }
            if(operator==='*'){
                result=num1*num2;
            }
            if(operator==='/'){
                result=num1/num2;
            }
            input.splice(index-2,3,result)
            index--;
        }

    }
    return result;
}

console.log(solve([
    5,
    3,
    4,
    '*',
    '-']));
console.log(solve([
    31,
    2,
    '+',
    11,
    '/']));
console.log(solve([
    15,
    '/']));