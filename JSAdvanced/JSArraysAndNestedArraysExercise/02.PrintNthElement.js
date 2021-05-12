function solve(input,step) {

    return input.filter((x,i)=>i%step===0);
}

console.log(solve([
    '5',
    '20',
    '31',
    '4',
    '20'],
    2));