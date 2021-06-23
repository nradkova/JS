const pizzUni = require('./index.js');
const assert = require('chai').assert;

describe('test pizzUni', () => {
    describe('test makeAnOrder functionality', () => {
        it('returns message with valid arguments', () => {
            let first = {
                orderedPizza: 'aaa',
                orderedDrink: 'bbb'
            }
            assert.equal( pizzUni.makeAnOrder(first),`You just ordered ${first.orderedPizza} and ${first.orderedDrink}.`);
    
            let second = {
                orderedPizza: 'aaa',
            }
            assert.equal(pizzUni.makeAnOrder(second),`You just ordered ${second.orderedPizza}`);
        });
        it('throws with invalid arguments', () => {
            let first={};
            assert.throws(() => pizzUni.makeAnOrder(first));
        });  
    });
    describe('test getRemainingWork functionality', () => {
        it('returns message not ready orders', () => {
            const orders = [{ pizzaName: 'aaa', status: 'ready' },
            { pizzaName: 'bbb', status: 'ready' },
            { pizzaName: 'ccc', status: 'preparing' }];
    
            assert.equal(pizzUni.getRemainingWork(orders),`The following pizzas are still preparing: ${orders[2].pizzaName}.`);
        });
        it('returns message if all orders ready', () => {
            const orders = [{ pizzaName: 'aaa', status: 'ready' },
            { pizzaName: 'bbb', status: 'ready' },
            { pizzaName: 'ccc', status: 'ready' }];
    
            assert.equal('All orders are complete!', pizzUni.getRemainingWork(orders));
        });
    })
    describe('test orderType functionality', () => {
        
        it('returns sum with valid arguments', () => {
            assert.equal(90, pizzUni.orderType(100, 'Carry Out'));
            assert.equal(100, pizzUni.orderType(100, 'Delivery'));
        });

    });
});

