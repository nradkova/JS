function solve(input) {

    let cities = {};

    input.forEach(line => {
        let [name, population] = line.split(' <-> ');
        if (!cities[name]) {
            cities[name] = 0;
        }
        cities[name] +=Number(population);
    });

    return Object.keys(cities)
        .map(key => {
            return `${key} : ${cities[key]}`;
        })
        .join('\n');
}

console.log(solve(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']));