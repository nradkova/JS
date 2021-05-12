function solve(input) {

    let newLength = Math.ceil((input.length - 1) / 2);

    return input
        .sort((a, b) => a - b)
        .slice(newLength);
}

console.log(solve([3, 19, 14, 7, 2, 19, 6]));