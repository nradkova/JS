function solve(...input) {
    let number = Number(input.shift());

    let output = '';
    while (input.length > 0) {
        let command = input.shift();

        if (command === 'chop') {
            number /= 2;
        }
        if (command === 'dice') {
            number = Math.sqrt(number);
        }
        if (command === 'spice') {
            number += 1;
        }
        if (command === 'bake') {
            number *= 3;
        }
        if (command === 'fillet') {
            number *= 0.8;
        }
        output += number + '\n';
    }
    return output.trimEnd();
}

console.log(solve('32', 'chop', 'chop', 'chop', 'chop', 'chop'));
console.log(solve('9', 'dice', 'spice', 'chop', 'bake', 'fillet'));

