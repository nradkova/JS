function solve(input) {

    let output = [];

    input.reduce((acc, num) => {
        if (num >= acc) {
            acc = num;
            output.push(num);
        }
        return acc;
    }, input[0]);
    
    return output;
}

console.log(solve([
    1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24]));