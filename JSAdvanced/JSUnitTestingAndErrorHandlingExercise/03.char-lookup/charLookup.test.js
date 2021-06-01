const lookupChar = require('./charLookup');
const assert = require('chai').assert;

describe('checks lookUpChar functionality', () => {
    it('valid input type and values return correct char', () => {
        assert.equal('1',lookupChar('1',0));
        assert.equal('2',lookupChar('12',1));
    })

    it('non-string first parameter returns undefined', () => {
        assert.isUndefined(lookupChar());
        assert.isUndefined(lookupChar([1,2],1));
        assert.isUndefined(lookupChar({1:2},1));
    })

    it('invalid second parameter type returns undefined', () => {
        assert.isUndefined(lookupChar('1'));
        assert.isUndefined(lookupChar('1,2',1.3));
        assert.isUndefined(lookupChar('1,2','1'));
        assert.isUndefined(lookupChar('1,2','a'));
    })

    it('invalid both parameters return undefined', () => {
        assert.isUndefined(lookupChar([1,2],'1'));
    })

    it('invalid second parameter value returns incorrect index', () => {
        assert.equal('Incorrect index',lookupChar('1',3));
        assert.equal('Incorrect index',lookupChar('12',-3));
        assert.equal('Incorrect index',lookupChar('12',2));
    })
});
