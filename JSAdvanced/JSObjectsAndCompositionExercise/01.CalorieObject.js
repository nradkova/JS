function solve(input) {
    return input.reduce((acc, el, i) => {
        if (i % 2 === 0) {
            acc[el] = undefined;
        } else {
            let prevEl = input[i - 1];
            acc[prevEl] = Number(el);
        }
        return acc;
    },{});
}

console.log(solve([
    'Yoghurt', '48', 
    'Rise', '138', 
    'Apple', '52']));