function solve(input) {

    const heroes =
        input.reduce((acc, line) => {
            let [name, level, items] = line.split(' / ');
            level = Number(level);
            items = !items ? [] : items.split(', ');
            acc.push(createHero(name, level, items));
            return acc;
        }, []);

    return JSON.stringify(heroes);

    function createHero(name, level, items) {
        return {
            name,
            level,
            items,
        }
    };
}

console.log(solve([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']));