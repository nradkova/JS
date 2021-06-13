const isSymmetric=require('./checkForSymmetry');
const assert = require("chai").assert;

describe('test isSymmetric functionality', () => {

    it('non-array input return false', () => {

        assert.isFalse(isSymmetric('a, d'));
    });
    it('valid input number values return true', () => {

        assert.isTrue(isSymmetric([1,1]));
    });
    it('valid string number values return true', () => {

        assert.isTrue(isSymmetric(['a','a']));
    });
    it('invalid input values return false', () => {

        assert.isFalse(isSymmetric([1,1,2]));
    });
    it('invalid type of input values return false', () => {

        assert.isFalse(isSymmetric([1,'1']));
    });

});         