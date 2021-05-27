function solution() {
    const recipes = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
    };
    const storage = {
        protein: 0,
        carbohydrate: 0,
        flavour: 0,
        fat: 0
    }

    let message = '';

    const processor = {
        restock: (el, qty) => {
            storage[el] += Number(qty);
            message = 'Success';
        },
        prepare: (product, qty) => {
            let hasSuccessed = true;
            hasSuccessed = cook(product,qty, hasSuccessed);
        },
        report: () => {
            message = `protein=${storage.protein} carbohydrate=${storage.carbohydrate} fat=${storage.fat} flavour=${storage.flavour}`;
        }
    }
    
    return (input) => {
        let [command, ...args] = input.split(' ');
        processor[command](...args);
        return message;
    }

    function cook(product,qty, hasSuccessed) {
        Object.entries(recipes).forEach(recipe => {
            let [name,ingriedents] =recipe;
            if (product === name) {
                Object.entries(ingriedents).forEach(el => {
                    if (hasSuccessed
                        && (storage[el[0]] < el[1] * Number(qty))) {
                        hasSuccessed = false;
                        message = `Error: not enough ${el[0]} in stock`;
                    }
                });
                if (hasSuccessed) {
                    Object.entries(ingriedents).forEach(el => {
                        storage[el[0]] -= el[1] * Number(qty);
                    });
                    message = 'Success';
                }
            }
        });
        return hasSuccessed;
    }
}
let manager = solution();
console.log(manager("restock flavour 50")); 
console.log(manager("prepare lemonade 4")); 
console.log(manager("report")); 
