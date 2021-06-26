const ChristmasMovies = require('./app.js');
const assert = require('chai').assert;

describe('test HolidayPackage', () => {
    let movies = undefined;
    let first = undefined;
    let second = undefined;
    beforeEach(() => {
        movies = new ChristmasMovies();
        first = 'aaa'; 
        second = 'bbb';
    })

    describe('test constructor functionality', () => {
        it('initializing correctly', () => {
            assert.equal(0, movies.movieCollection.length)
            assert.isArray(movies.movieCollection)
            assert.isObject(movies.watched)
            assert.isArray(movies.actors)
            assert.equal(0, movies.actors.length)
        })
    });
    
    describe('test buyMovie functionality', () => {
        it('works correctly', () => {
            assert.equal(
                'You just got aaa to your collection in which x, y are taking part!'
                , movies.buyMovie(first, ['x', 'y'])
            );
            assert.equal(
                'You just got bbb to your collection in which x, y are taking part!'
                , movies.buyMovie(second, ['x', 'y'])
            );
            assert.equal(2, movies.movieCollection.length)
            assert.equal(first, movies.movieCollection[0].name)
            assert.equal('x', movies.movieCollection[0].actors[0])
           
            movies.buyMovie('ccc', ['x', 'x'])
            assert.equal('x', movies.movieCollection[2].actors.join(', '));
        })
        it('throws', () => {
            movies.buyMovie(first, ['x', 'y'])
            assert.throws(() => movies.buyMovie(first, ['x', 'y']));
        })
    });

    describe('test discardMovie functionality', () => {
        it('works correctly', () => {
            movies.buyMovie(first, ['x', 'y'])
            movies.buyMovie(second, ['x', 'y'])
            movies.watchMovie(first)
            
            assert.equal('You just threw away aaa!', movies.discardMovie(first));
            assert.equal(second, movies.movieCollection[0].name);
            assert.isFalse(movies.movieCollection.includes(m => m.name === first))
            assert.isUndefined(movies.watched[first])
        })
        it('throws', () => {
            movies.buyMovie(first, ['x', 'y'])
           
            assert.throws(() => movies.discardMovie(first));
            assert.throws(() => movies.discardMovie(second));
        })
    });

    describe('test watchMovie functionality', () => {
        it('works correctly', () => {
            movies.buyMovie(first, ['x', 'y'])
            movies.watchMovie(first)
            movies.watchMovie(first)
            assert.equal(2, movies.watched[first]);
        })
        it('throws', () => {
            assert.throws(() => movies.watchMovie(first),'No such movie in your collection!');
        })
    });

    describe('test favouriteMovie functionality', () => {
        it('works correctly', () => {
            movies.buyMovie(first, ['x', 'y'])
            movies.buyMovie(second, ['x', 'y'])
            movies.watchMovie(first)
            movies.watchMovie(first)
            movies.watchMovie(second)
           
            assert.equal(
                'Your favourite movie is aaa and you have watched it 2 times!',
                 movies.favouriteMovie()
            );
        })
        it('throws', () => {
            movies.buyMovie(first, ['x', 'y'])
           
            assert.throws(() => movies.favouriteMovie());
        })
    });
   
    describe('test mostStarredActor functionality', () => {
        it('works correctly', () => {
            movies.buyMovie(first, ['x', 'y'])
            movies.buyMovie(second, ['z', 'y'])
            movies.watchMovie(first)
            movies.watchMovie(first)
            movies.watchMovie(second)
           
            assert.equal(
                'The most starred actor is y and starred in 2 movies!',
                 movies.mostStarredActor()
            );
        })
        it('throws', () => {
            assert.throws(() => movies.mostStarredActor());
        })
    });
});

