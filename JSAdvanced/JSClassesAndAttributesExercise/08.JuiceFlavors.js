function solve(arr) {
    const produced = {};
    
     arr.reduce((acc, line) => {
        let [name, quantity] = line.split('=>');
        if (!acc[name]) { acc[name] = 0; }
        acc[name] += +quantity;

        let bottles = Math.trunc(acc[name] / 1000);
        if (bottles > 0) {
            if (!produced[name]) { produced[name] = 0; }
            produced[name] += bottles;
        }
        acc[name] -= bottles * 1000;

        return acc;
    }, {});

    return Object.entries(produced)
        .map(([k, v]) => `${k}=> ${v}`)
        .join('\n');
};

console.log(solve(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']))