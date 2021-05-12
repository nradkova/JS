function solve(input) {

    let count = 1;
    let output = input
        .reduce((acc, el) => {
            el === 'add' ? acc.push(count) : acc.pop();
            count++;
            return acc;
        }, []);
        
    return output.length !== 0 ? output.join('\n') : 'Empty';
}

console.log(solve([
    'add',
    'add',
    'add',
    'add']
));