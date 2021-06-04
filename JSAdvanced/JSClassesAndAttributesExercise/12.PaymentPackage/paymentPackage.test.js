const PaymentPackage=require('./paymentPackage');
const assert=require('chai').assert;

describe('test PaymentPackage',()=>{
    let pack=undefined;
    beforeEach(()=>{
        pack=new PaymentPackage('Pack',1000);
    });

    describe('test initializing',()=>{
        it('initializing properly',()=>{
           // const pack=new PaymentPackage('Pack',1000);
            assert.equal('Pack',pack._name);
            assert.equal(1000,pack._value);
            assert.equal(20,pack._VAT);
            assert.equal(true,pack._active);
        });
    });

    describe('test name property',()=>{
        it('setting non-string name throws',()=>{
            assert.throws(()=>pack.name=2,'Name must be a non-empty string');
        });
        it('setting empty string name throws',()=>{
            assert.throws(()=>pack.name='','Name must be a non-empty string');
        });
        it('setting valid string name works',()=>{
            pack.name='New';
            assert.equal('New',pack.name);
        });
        it('getting name works',()=>{
            assert.equal('Pack',pack.name);
        });         
    });

    describe('test value property',()=>{
        it('setting non-number value throws',()=>{
            assert.throws(()=>pack.value='a','Value must be a non-negative number');
        });
        it('setting negative value throws',()=>{
            assert.throws(()=>pack.value=-10,'Value must be a non-negative number');
        });
        it('setting zero value works',()=>{
            pack.value=0;
            assert.equal(0,pack.value);
        });
        it('setting valid value works',()=>{
            pack.value=2000;
            assert.equal(2000,pack.value);
        });
        it('getting value works',()=>{
            assert.equal(1000,pack.value);
        });         
    });

    describe('test VAT property',()=>{
        it('setting non-number VAT throws',()=>{
            assert.throws(()=>pack.VAT='a','VAT must be a non-negative number');
        });
        it('setting negative VAT throws',()=>{
            assert.throws(()=>pack.VAT=-10,'VAT must be a non-negative number');
        });
        it('setting valid VAT works',()=>{
            pack.VAT=15;
            assert.equal(15,pack.VAT);
        });
        it('getting VAT works',()=>{
            assert.equal(20,pack.VAT);
        });         
    });

    describe('test active property',()=>{
        it('setting non-boolean active throws',()=>{
            assert.throws(()=>pack.active='a','Active status must be a boolean');
            assert.throws(()=>pack.active=null,'Active status must be a boolean');
        });
        it('setting valid active works',()=>{
            pack.active=false;
            assert.equal(false,pack.active);
        });
        it('getting active works',()=>{
            assert.equal(true,pack.active);
        });         
    });

    describe('test toString method',()=>{
        it('"active=true" returns ""',()=>{
            const output = [
                `Package: Pack`,
                `- Value (excl. VAT): 1000`,
                `- Value (VAT 20%): 1200`];
          
              assert.equal(output.join('\n'),pack.toString());
        });
        it('"active=false" returns "inactive"',()=>{
            pack.active=false;
            const output = [
                `Package: Pack (inactive)`,
                `- Value (excl. VAT): 1000`,
                `- Value (VAT 20%): 1200`];
              assert.equal(output.join('\n'),pack.toString());
        });
    });
});

