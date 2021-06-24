//90/100
const HolidayPackage = require('./app.js');
const assert = require('chai').assert;

describe('test HolidayPackage', () => {
    let pack = undefined;
    let first = undefined;
    let second = undefined;
    beforeEach(() => {
        pack = new HolidayPackage('Italy', 'Summer');
        first = 'Ivan Ivanov';
        second = 'Petar Petrov';
    })

    describe('test constructor functionality', () => {
        it('initializing correctly', () => {
            assert.instanceOf(pack, HolidayPackage);
            assert.typeOf(pack.vacationers, 'array')
            assert.typeOf(pack.destination, 'string')
            assert.typeOf(pack.season, 'string')
            assert.isFalse(pack.insuranceIncluded)
        })
    });

    describe('test insuranceIncluded functionality', () => {
        it('insuranceIncluded works correctly', () => {
            assert.doesNotThrow(() => pack.insuranceIncluded = true)
            assert.equal(true, pack.insuranceIncluded)
        })
        it('insuranceIncluded throws with non boolean argument', () => {
            assert.throws(() => pack.insuranceIncluded(6))
        })
    });
    describe('test showVacationers functionality', () => {
        it('showVacationers works correctly', () => {
            assert.equal("No vacationers are added yet", pack.showVacationers());
            pack.addVacationer(first);
            pack.addVacationer(second);
            assert.equal(`Vacationers:\n${pack.vacationers.join('\n')}`, pack.showVacationers());
        })
    });
    describe('test addVacationer functionality', () => {
        it('addVacationer works correctly', () => {
            pack.addVacationer(first);
            assert.equal(first, pack.vacationers[0]);

        })
        it('addVacationer throws invalid argument', () => {
            assert.throws(() => pack.addVacationer(6));
            assert.throws(() => pack.addVacationer(''));
            assert.throws(() => pack.addVacationer('aaa'));
        })
    });
    describe('test generateHolidayPackage functionality', () => {
        it('generateHolidayPackage works correctly', () => {
            pack.addVacationer(first);
            pack.addVacationer(second);
            let expected = "Holiday Package Generated\n" +
                "Destination: " + pack.destination + "\n" +
                pack.showVacationers() + "\n" +
                "Price: " + 1000;
            assert.equal(expected, pack.generateHolidayPackage());

            pack.insuranceIncluded = true;
            expected = "Holiday Package Generated\n" +
                "Destination: " + pack.destination + "\n" +
                pack.showVacationers() + "\n" +
                "Price: " + 1100;
            assert.equal(expected, pack.generateHolidayPackage());

            let newPack=new HolidayPackage('aaa','Spring');
            newPack.addVacationer(first);
            expected = "Holiday Package Generated\n" +
                "Destination: " + newPack.destination + "\n" +
                newPack.showVacationers() + "\n" +
                "Price: " + 400;
            assert.equal(expected, newPack.generateHolidayPackage());

        //    let otherPack=new HolidayPackage('aaa','Winter');
        //    otherPack.addVacationer(first);
        //     expected = "Holiday Package Generated\n" +
        //         "Destination: " + otherPack.destination + "\n" +
        //         otherPack.showVacationers() + "\n" +
        //         "Price: " + 600;
        //     assert.equal(expected, otherPack.generateHolidayPackage());
        })
        it('addVacationer throws zero vacationers', () => {
            assert.throws(() => pack.generateHolidayPackage());
        })
    });
});

