function solve(input, rotationsCount) {
    
    rotationsCount %= input.length;

    for (let rotation = 0; rotation <rotationsCount; rotation++) {
       input.unshift(input.pop());
        
    }
    return input.join(' ');
}

console.log(solve([
    '1',
    '2',
    '3',
    '4'],
    2));