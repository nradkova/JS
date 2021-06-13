const sum = require('./sumOfNumbers');
const assert = require("chai").assert;

describe('summing numbers', () => {
    it('summing numbers works', () => {

        assert.equal(10,sum([1,2,3,4]));
    });
    it('summing invalid values return NaN', () => {

        assert.isNaN(sum(['a','a']));
    });
    it('summing values from non-array input return NaN', () => {

        assert.isNaN(sum('a , 1'));
    });

});


