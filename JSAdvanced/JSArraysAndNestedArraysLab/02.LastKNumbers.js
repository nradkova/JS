function solve(...input) {
    let target = Number(input[0]);
    let count = Number(input[1]);
    let result = [1];
    let index = 1;

    while (index < target) {

        if (index < count) {
            result.push(result.reduce((a, b) => a + b, 0));

        } else {
            result.push(result.slice(index-count).reduce((a, b) => a + b, 0));
        }
        index++;
    }
    return result;

}
console.log(solve(6, 3));
console.log(solve(8,2));
