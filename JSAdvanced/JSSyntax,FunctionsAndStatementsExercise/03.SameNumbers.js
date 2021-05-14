function solve(number) {
    let digits = number
        .toString()
        .split('')
        .map(Number);

    let firstDigit = digits[0];
    let areEqual = true;
    let digitSum =0;

    digits.forEach((digit) => {
        if (digit !== firstDigit) {
            areEqual = false;
        }
        digitSum+=digit;
    });

    return `${areEqual}\n${digitSum}`;
}

console.log(solve(222225))