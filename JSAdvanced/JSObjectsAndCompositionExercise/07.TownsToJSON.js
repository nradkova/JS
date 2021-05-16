function solve(input) {

    function parseLine(line) {
        return line.split('|').filter(x => x !== '').map(x => x.trim());
    }

    const towns = [];
    let townsProps = parseLine(input[0]);
    input.slice(1).reduce((towns, line) => {
        line = parseLine(line);
        const currentTown = {};
        line.forEach((el, index) => {
            el = !isNaN() ? Number(Number(el).toFixed(2)) : el;
            currentTown[townsProps[index]] = el;
        });
        towns.push(currentTown);
        return towns;
    }, towns)

    return JSON.stringify(towns);
}

console.log(solve([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']));