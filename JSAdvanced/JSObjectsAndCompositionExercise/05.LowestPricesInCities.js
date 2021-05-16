function solve(input) {
   const products={};
   input.reduce((products,line)=>{
        let[town,product,price]=line.split('|').filter(x=>x!=='').map(x=>x.trim());
        price=Number(price);
        if(!products[product]){
            products[product]={price,town};
        }else if(products[product].price>price){
            products[product]={price,town};
        }
        return products;
    },products);

    return Object.keys(products).map(key=>{
        return `${key} -> ${products[key].price} (${products[key].town})`;
    }).join('\n');
}

console.log(solve([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']
));