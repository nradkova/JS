function solve(...input) {

    let [name, population, treasury] = input;

    let city = { name, population, treasury };
    city.taxRate = 10;
    city.collectTaxes = collectTaxes;
    city.applyGrowth = applyGrowth;
    city.applyRecession = applyRecession;
    
    return city;

    function collectTaxes() {
        this.treasury += this.population * this.taxRate;
        this.treasury=Math.round(this.treasury);
    }

    function applyGrowth(percentage) {
        this.population +=this.population / 100 * percentage;
        this.population=Math.round(this.population);
    }
    
    function applyRecession(percentage) {
        this.treasury -=this.treasury / 100 * percentage;
        this.treasury=Math.round(this.treasury);
    }
}

console.log(solve('Tortuga',
    7000,
    15000));