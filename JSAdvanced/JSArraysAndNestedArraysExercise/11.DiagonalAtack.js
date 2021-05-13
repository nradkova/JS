function solve(input) {
    let matrix = readMatrix();
    let temp = readTemp();

    let firstDiagonalSum = 0;
    for (let row = 0; row < matrix.length; row++) {
        firstDiagonalSum += matrix[row][row];
        temp[row][row] = 1;
    }

    let secondDiagonalSum = 0;
    for (let row = 0; row < matrix.length; row++) {
        secondDiagonalSum += matrix[row][matrix.length-1-row];
        temp[row][matrix.length-1-row] = 1;
    }

    if (firstDiagonalSum === secondDiagonalSum) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (!temp[row][col]) {
                    matrix[row][col] = firstDiagonalSum;
                }
            }
        }
    }
    
    return printMatrix();

    function printMatrix(){
        let output = '';
        matrix.forEach(row => {
            output += row.join(' ')+'\n';
        })
        return output;
    }

    function readMatrix() {
        let matrix = [];
        for (const line of input) {
            matrix.push(line.split(' ').map(Number));
        }
        return matrix;
    }

    function readTemp() {
        let temp = [];
        for (let row = 0; row < matrix.length; row++) {
            let rowArr = [];
            rowArr.length = matrix[row].length;
            temp.push(rowArr);
        }
        return temp;
    }
}

console.log(solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']));
console.log(solve([]));