function solve(...input) {
    input = input.map((a) => a.length);
    
    let totalLength = input.reduce((a, b) => a + b, 0);
    let averageLength = Math.floor(totalLength / input.length);

    return totalLength + "\n" + averageLength;
}
console.log(solve('chocolate', 'ice cream', 'cake'))