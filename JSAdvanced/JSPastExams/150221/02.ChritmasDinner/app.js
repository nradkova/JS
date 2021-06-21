class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }
    
    set budget(value) {
        if (value < 0) {
            throw new Error("The budget cannot be a negative number");
        }
        this._budget = value;
    }

    get budget() {
        return this._budget;
    }

    shopping(arr) {
        let [product, price] = arr;
        if (this._budget < price) {
            throw new Error("Not enough money to buy this product");
        }
        this.products.push(product);
        this._budget -= price;
        return `You have successfully bought ${product}!`;
    }

    recipes(recipe) {
        if (recipe.productsList.every(p => this.products.includes(p))) {
            this.dishes.push(recipe);
            return `${recipe.recipeName} has been successfully cooked!`;
        }
        throw new Error("We do not have this product");
    }

    inviteGuests(guestName, dishName) {
        if (!this.dishes.some(d => d.recipeName === dishName)) {
            throw new Error("We do not have this dish");
        }
        if (Object.keys( this.guests).includes(guestName)) {
            throw new Error("This guest has already been invited");
        }
        this.guests[guestName]=dishName;
        return `You have successfully invited ${guestName}!`;
    }

    showAttendance() {
        let result='';
        Object.entries( this.guests).forEach(([name,dish]) => {
            const dishObj=this.dishes.find(d=>d.recipeName===dish);
            const products = dishObj.productsList.join(', ');
            result+=`${name} will eat ${dish}, which consists of ${products}\n`;
        })
        return result.trimEnd();
    }
};

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');
console.log(dinner.guests)
console.log(dinner.showAttendance());
