function solve(input) {
    return input
        .filter((el, i) => i % 2 === 0)
        .join(' ');
}

console.log(solve(['20', '30', '40', '50', '60']));