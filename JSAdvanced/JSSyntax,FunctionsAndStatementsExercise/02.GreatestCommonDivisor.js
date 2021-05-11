function solve(...numbers) {

    let smaller = Math.min(...numbers);
    let bigger = Math.max(...numbers);

    let remainder = bigger % smaller;
    while (remainder > 0) {
        let temp = remainder;
        remainder = smaller % temp;
        smaller = temp;
    }
    return smaller;
}

console.log(solve(1071, 462))
console.log(solve(2154, 458))
