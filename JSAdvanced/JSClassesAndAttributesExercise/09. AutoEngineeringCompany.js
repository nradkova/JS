function solve(arr) {
    const produced = arr.reduce((acc, line) => {
        let [brand, model, quantity] = line.split(' | ');
        quantity = Number(quantity);

        if (!acc[brand]) {
            acc[brand] = [];
            acc[brand].push({ [model]:quantity });
            
        }else {
            let existingModel = acc[brand].find(x =>x[model]);
            if (!existingModel) {
                acc[brand].push({ [model]:quantity });
            } else {
                existingModel[model] += quantity;
            }
        }
        return acc;
    }, {});

    return Object.entries(produced)
        .map(([brand, entries]) => {
            let cars = entries.map(model => {
                let key=Object.keys(model);
                return `###${key} -> ${model[key]}`;
            }).join('\n');
            return `${brand}\n${cars}`
        }).join('\n');
};

console.log(solve([
    'Audi | Q7 | 1000',
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']))