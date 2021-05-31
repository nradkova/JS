const isOddOrEven = require('./evenOrOdd');
const assert = require('chai').assert;

describe('check oddEven functionality', () => {
    it('valid input type returns correct length', () => {
        assert.equal('odd',isOddOrEven('1'));
        assert.equal('even',isOddOrEven('12'));
        assert.equal('even',isOddOrEven(''));
    })
    it('invalid input type returns undefined', () => {
        assert.isUndefined(isOddOrEven());
        assert.isUndefined(isOddOrEven([1,2]));
        assert.isUndefined(isOddOrEven({1:2}));
    })
});
