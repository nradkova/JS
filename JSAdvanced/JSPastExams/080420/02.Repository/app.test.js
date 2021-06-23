const { Repository } = require('./app.js');
const assert = require('chai').assert;

describe('test Repository', () => {
    let prop = undefined;
    let rep = undefined;
    let first = undefined;
    let second = undefined;
    beforeEach(() => {
        prop = {
            name: "string",
            age: "number",
            birthday: "object"
        }
        rep = new Repository(prop);
        first = {
            name: "Pesho",
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
        second = {
            name: 'Gosho',
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
    })

    describe('test constructor functionality', () => {
        it('initializing correctly', () => {
            assert.instanceOf(rep, Repository);
            assert.typeOf(rep.props, 'object')
            assert.isTrue(rep.props.hasOwnProperty('name'))
            assert.typeOf(rep.data, 'Map')
            assert.typeOf(rep.nextId, 'function')
        })
    });
    
    describe('test getter count functionality', () => {
        it('count works correctly', () => {
            assert.equal(0, rep.count)
            assert.equal(0,rep.data.size)
        })
    });

    describe('test add functionality', () => {
        it('add works correctly with valid entity', () => {
            assert.equal(0, rep.add(first))
            assert.equal(1, rep.add(second))
            assert.equal(2, rep.nextId())
            assert.equal(2,rep.count)
        })
        it('add throws with invalid entity ', () => {
            first = {
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            assert.throws(() => rep.add(first),Error)
        })
    });

    describe('test getId functionality', () => {
        it('getId works correctly with valid id', () => {
            rep.add(first);
            assert.equal(JSON.stringify(first),JSON.stringify(rep.getId(0)))
        })
        it('getId throws with invalid id', () => {
            rep.add(first);
            assert.throws(() => rep.getId(3),Error)
        })
    });

    describe('test update functionality', () => {
        it('update works correctly with valid id', () => {
            rep.add(first);
            rep.update(0, second)
            assert.equal(JSON.stringify(second),JSON.stringify(rep.getId(0)))
        })
        it('update throws with invalid id', () => {
            assert.throws(() => rep.update(3, second),Error)
        })
        it('update throws with invalid entity', () => {
            rep.add(first)
            second = {
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            assert.throws(() => rep.update(0, second),Error)
        })
    });

    describe('test del functionality', () => {
        it('del works correctly with valid id', () => {
            rep.add(first);
            rep.add(second);
            rep.del(1);
            assert.equal(1, rep.count)
            assert.isFalse(rep.data.has(1));
        })
        it('update throws with invalid id', () => {
            rep.add(first);
            assert.throws(() => rep.del(3),Error)
        })
    })

    describe('test entire _validate functionality', () => {
        it('_validate tests missing properties', () => {
            first = {
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            assert.throws(() => rep._validate(first),Error)

            first = {
                name: "Pesho",
                birthday: new Date(1998, 0, 7)
            };
            assert.throws(() => rep._validate(first),Error)

            first = {
                name: "Pesho",
                age: 22,
            };
            assert.throws(() => rep._validate(first),Error)
        })
        it('_validate tests properties type', () => {
            first = {
                name: 6,
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            assert.throws(() => rep._validate(first),TypeError)

            first = {
                name: "Pesho",
                age: 'aa',
                birthday: new Date(1998, 0, 7)
            };
            assert.throws(() => rep._validate(first),TypeError)

            first = {
                name: "Pesho",
                age: 22,
                birthday: 'aa'
            };
            assert.throws(() => rep._validate(first),TypeError)
        })
    })
});

