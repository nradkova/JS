function solve(...input) {
    const types = [];
    let result = [];

    input.forEach(x => {
        types.push({ [typeof x]: x });
        result.push(`${typeof x}: ${x}`);
    });
    
    const values = new Map();
    types.forEach(type => {
        const key = Object.keys(type)[0];
        !values[key] ? values[key] = 1 : values[key] += 1;
    });

    Object.keys(values)
        .sort((a, b) => values[b] - values[a])
        .forEach(a => result.push(`${a} = ${values[a]}`));

    result.forEach(x => console.log(x));
}
console.log(solve({ name: 'bob' }, 3.333, 9.999))
console.log(solve('cat', 42, function () { console.log('Hello world!'); }))