function solve(input) {
    input = input.map(Number);

    let sum = input
        .reduce((a, b) => a + b, 0);

    let inverseSum = input
        .map((a) => 1 / a)
        .reduce((a, b) => a + b, 0);
        
    let concat = input
        .reduce((a, b) => a + b, '');

    return `${sum}\n${inverseSum}\n${concat}`;
}

console.log(solve([1, 2, 3]))
console.log(solve([2, 4, 8, 16]))
