function solve(matrix) {

    let subSum = matrix[0].reduce(sum);

    for (let row = 0; row < matrix.length; row++) {
        if (subSum !== matrix[row].reduce(sum)) {
            return false;
        };
    }

    for (let col = 0; col < matrix.length; col++) {
        let column = [];
        for (let row = 0; row < matrix.length; row++) {
            column.push(matrix[row][col]);
        }
        if (subSum !== column.reduce(sum)) {
            return false;
        };
    }

    return true;

    function sum(a, b) {
        return a + b;
    }
}

console.log(solve([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]));
