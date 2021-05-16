function solve(input) {
    const catalogue = {};
    input.reduce((catalogue, line) => {
        let [product, price] = line.split(':');
        let firstLetter = product[0].toUpperCase();
        product = firstLetter + product.slice(1, product.length - 1);

        if (!catalogue[firstLetter]) { catalogue[firstLetter] = [];};

        catalogue[firstLetter].push({ product, price });
        catalogue[firstLetter].sort((a, b) => a.product.localeCompare(b.product));
        return catalogue;
    }, catalogue);

    return Array.from(Object.keys(catalogue))
        .sort((a, b) => a.localeCompare(b))
        .map((key) => {
            let entries = catalogue[key]
                .map(x => `  ${x.product}:${x.price}`)
                .join('\n');
            return `${key}\n${entries}`;
        })
        .join('\n');
}

console.log(solve([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
));