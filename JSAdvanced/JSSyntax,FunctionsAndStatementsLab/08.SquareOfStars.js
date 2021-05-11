function solve(number = 5) {
    let output = "";
    for (let count = 1; count <= number; count++) {
        output += `${'* '.repeat(number)}\n`
    }
    return output;
}

console.log(solve(2))