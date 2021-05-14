function solve(input) {
    let regex = /\w+/g;
    let matches = [...input.match(regex)];

    return matches
        .map(a => a.toUpperCase())
        .join(', ');
}

console.log(solve('Hi, how are you?'))
console.log(solve('Hello'))
