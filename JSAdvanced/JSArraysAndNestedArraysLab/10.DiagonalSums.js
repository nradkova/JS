function solve(matrix) {

    let output = [];

    let firstSum = 0;
    let firstRow = 0;
    let firstCol = 0;

    while (firstRow < matrix.length) {
        firstSum += matrix[firstRow][firstCol];
        firstRow++;
        firstCol++;
    }

    output.push(firstSum);

    let secondSum = 0;
    let secondRow = matrix.length - 1;
    let secondCol = 0;

    while (secondRow >= 0) {
        secondSum += matrix[secondRow][secondCol];
        secondRow--;
        secondCol++;
    }

    output.push(secondSum);

    return output.join(' ');
}

console.log(solve([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
]));