const createCalculator = require('./addSubtract');
const assert = require("chai").assert;

describe('check calculator functionality', () => {
    let result = undefined;
    beforeEach(() => {
        result = createCalculator();
    });

    it('returns object', () => {
        assert.isObject(createCalculator());
    });

    it('returns object with default functions', () => {
        assert.isFunction(result.add);
        assert.isFunction(result.subtract);
        assert.isFunction(result.get);
    });

    it('internal value is unreachable', () => {
       assert.isUndefined(result.value);
    });

    it('getting works', () => {
        assert.equal(0,result.get());
    });

    it('adding works with valid input values', () => {
        result.add(3);
        result.add('3');
        assert.equal(6,result.get());
    });

    it('subtracting works with valid input values', () => {
        result.subtract(3);
        result.subtract('3');
        assert.equal(-6,result.get());
    });

    it('adding with invalid input values returns NaN', () => {
        result.add('a');
        assert.isNaN(result.get());
    });

    it('subtracting with invalid input values returns NaN', () => {
        result.subtract('a');
        assert.isNaN(result.get());
    });
});