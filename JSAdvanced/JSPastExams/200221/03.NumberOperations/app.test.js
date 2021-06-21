const numberOperations = require('./app');
const assert = require('chai').assert;

describe('tests numberOperations', () => {
    describe('test powNumber functionality', () => {
        it('returns number with number argument', () => {
            assert.equal(4, numberOperations.powNumber(2));
            assert.equal(1.0, numberOperations.powNumber(1.0));
        })
        it('returns NaN with non number argument', () => {
            assert.isNaN(numberOperations.powNumber('a'));
        })
    })
    describe('test numberChecker functionality', () => {
        it('returns correct message with number argument', () => {
            assert.equal('The number is lower than 100!', numberOperations.numberChecker(2));
            assert.equal('The number is greater or equal to 100!', numberOperations.numberChecker(100));
            assert.equal('The number is greater or equal to 100!', numberOperations.numberChecker(101));
        })
        it('returns NaN with non number argument', () => {
            assert.throws(()=>numberOperations.numberChecker('a'));
        })
    })
    describe('test sumArrays functionality', () => {
        it('returns number array with number array arguments', () => {
            const result=[6,7,3];
            assert.equal(result[2], numberOperations.sumArrays([1,2,3],[5,5])[2]);
        })
        it('returns string element in output array with string array argument', () => {
            const result=['a5', 5];
            assert.equal(result[0], numberOperations.sumArrays(['a'],[5,5])[0]);
        })
    })
});