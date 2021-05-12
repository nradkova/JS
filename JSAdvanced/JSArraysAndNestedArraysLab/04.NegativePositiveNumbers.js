function solve(input) {

    let negative = input.filter(x => x < 0).reverse();
    let positive = input.filter(x => x >= 0);

    return negative
        .concat(positive)
        .join('\n');
}

console.log(solve([7, -2, 8, 9]));