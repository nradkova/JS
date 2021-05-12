function solve(input) {

    return input
    .map(row=>Math.max(...row))
    .sort((a,b)=>b-a)
    .shift();
}

console.log(solve(
    [[20, 50, 10],
    [8, 33, 145]]));