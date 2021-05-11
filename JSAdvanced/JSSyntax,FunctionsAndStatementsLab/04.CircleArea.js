function solve(input) {
    let type=typeof input;
    if (type!=='number') {
        return `We can not calculate the circle area, because we receive a ${type}.`;
    }
    return (Math.PI * input ** 2).toFixed(2);
}

console.log(solve(0))