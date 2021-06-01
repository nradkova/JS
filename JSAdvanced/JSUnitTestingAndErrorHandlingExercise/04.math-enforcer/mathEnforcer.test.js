const mathEnforcer=require('./mathEnforcer');
const assert=require('chai').assert;

describe('checks mathEnforcer functionality', () => {
    describe('addFive',()=>{
        it('valid input type returns correct result', () => {
            assert.equal(10,mathEnforcer.addFive(5));
            assert.equal(0,mathEnforcer.addFive(-5));
            assert.closeTo(10.5,mathEnforcer.addFive(5.5),0.01);
        })
    
        it('non-number input type returns undefined', () => {
            assert.isUndefined(mathEnforcer.addFive());
            assert.isUndefined(mathEnforcer.addFive('1'));
        })
    });

    describe('subtractTen',()=>{
        it('valid input type returns correct result', () => {
            assert.equal(-5,mathEnforcer.subtractTen(5));
            assert.equal(-15,mathEnforcer.subtractTen(-5));
            assert.closeTo(-4.5,mathEnforcer.subtractTen(5.5),0.01);
        })
    
        it('non-number input type returns undefined', () => {
            assert.isUndefined(mathEnforcer.subtractTen());
            assert.isUndefined(mathEnforcer.subtractTen('1'));
        })
    });

    describe('sum',()=>{
        it('valid parameters type and values return correct result', () => {
            assert.equal(10,mathEnforcer.sum(5,5));
            assert.equal(-15,mathEnforcer.sum(-5,-10));
            assert.closeTo(10,mathEnforcer.sum(5.5,4.5),0.01);
        })
    
        it('non-number type of any parameter returns undefined', () => {
            assert.isUndefined(mathEnforcer.sum(5,'5'));
            assert.isUndefined(mathEnforcer.sum('1',0));
            assert.isUndefined(mathEnforcer.sum('1','0'));
        })
    });
});