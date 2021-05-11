function solve(...input) {
    let [num1, num2, operator] = input;
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            return num1 % num2;
        case '**':
            return num1 ** num2;
    }
}
console.log(solve(5, 6, '*'))