const StringBuilder=require('./stringBuilder');
const assert=require('chai').assert;

describe('test StringBuilder class',()=>{
    let text=undefined;
    beforeEach(()=>{
        text=new StringBuilder('aaa');
    });

    describe('test initializing',()=>{
        it('initializing properly',()=>{
            assert.isArray(text._stringArray);
            assert.equal('a',text._stringArray[0]);
            assert.equal(3,text._stringArray.length);
        });
        it('initializing with undefined parameter returns empty array',()=>{
            const c=new StringBuilder();
            assert.equal(0,c._stringArray.length);
        });
    });

    describe('test _vrfyParam method',()=>{
        it('_vrfyParam with non-string input throws',()=>{
            assert.throws(()=>StringBuilder._vrfyParam(2));
        });
        it('_vrfyParam with string input works',()=>{
            assert.doesNotThrow(()=>StringBuilder._vrfyParam('ddd'));
        });
    });

    describe('test toString method',()=>{
        it('toString returns valid string output',()=>{
            assert.equal('aaa',text.toString());
            assert.equal(text._stringArray.join(''),text.toString());
            assert.equal('',new StringBuilder().toString());
        });
    });

    describe('test append method',()=>{
        it('appending valid string input works',()=>{
            text.append('bb');
            assert.equal('aaabb',text.toString());
        });
        it('appending non-string input throws',()=>{
            assert.throws(()=>text.append(2));
        });
    });

    describe('test prepend method',()=>{
        it('prepending valid string input works',()=>{
            text.prepend('bb');
            assert.equal('bbaaa',text.toString());
        });
        it('prepending non-string input throws',()=>{
            assert.throws(()=>text.prepend(2));
        });
    });

    describe('test insertAt method',()=>{
        it('inserting valid string input works',()=>{
            text.insertAt('bb',0);
            text.insertAt('h',1);
            assert.equal('bhbaaa',text.toString());
        });
        it('inserting at negative number index works',()=>{
            text.insertAt('b',-1);
            assert.equal('aaba',text.toString());
        });
        it('inserting non-string input throws',()=>{
            assert.throws(()=>text.insertAt(22,2));
        });
    });

    describe('test remove method',()=>{
        it('removing valid string input works',()=>{
            text=new StringBuilder('01234');
            text.remove(0,2)
            assert.equal('234',text.toString());
        });
        it('removing negative number length returns same array',()=>{
            text=new StringBuilder('01234');
            text.remove(0,-2)
            assert.equal('01234',text.toString());
        });
    });
});

