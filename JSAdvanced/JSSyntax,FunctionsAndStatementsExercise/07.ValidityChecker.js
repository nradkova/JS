function solve(...input) {

    let x1 = Number(input[0]);
    let y1 = Number(input[1]);
    let x2 = Number(input[2]);
    let y2 = Number(input[3]);

    let firstCheck = isValidDistance(x1, y1, 0, 0);
    let secondCheck = isValidDistance(x2, y2, 0, 0);
    let thirdCheck = isValidDistance(x1, y1, x2, y2);

    return `${printOutput(firstCheck, x1, y1, 0, 0)}
${printOutput(secondCheck, x2, y2, 0, 0)}
${printOutput(thirdCheck, x1, y1, x2, y2)}`;

    function isValidDistance(num1, num2, num3, num4) {
        let a = num1 - num3;
        let b = num2 - num4;

        let c = Math.sqrt(a * a + b * b);
        return Number.isInteger(c);
    }

    function printOutput(check, num1, num2, num3, num4) {
        let result = 'valid';
        if (!check) {
            result = 'invalid';
        }
        return `{${num1}, ${num2}} to {${num3}, ${num4}} is ${result}`;
    }
}

console.log(solve(2, 1, 1, 1));