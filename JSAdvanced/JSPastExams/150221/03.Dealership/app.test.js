const dealership = require('./app');
const assert = require('chai').assert;

describe('tests dealership', () => {

    describe('test newCarCost functionality', () => {
        it('returns calculated price with valid arguments', () => {
            const first = 'Audi A4 B8';
            const second = 'Audi A4';
            assert.equal(1000, dealership.newCarCost(first, 16000));
            assert.equal(16000, dealership.newCarCost(second, 16000));
        })
    })
    describe('test carEquipment functionality', () => {
        it('returns selected extras with valid arguments', () => {
            const extrasArr = ['a', 'b', 'c'];
            const indexArr = [0, 2];
            assert.equal('a', dealership.carEquipment(extrasArr, indexArr)[0]);
            assert.equal(2, dealership.carEquipment(extrasArr, indexArr).length);

        })
    })
    describe('test euroCategory functionality', () => {
        it('returns correct message with valid arguments', () => {
            const first = 'Your euro category is low, so there is no discount from the final price!';
            const second = 'We have added 5% discount to the final price: 14250.';
            assert.equal(first, dealership.euroCategory(2));
            assert.equal(second, dealership.euroCategory(4));
        })
    })
});