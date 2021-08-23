const cinema=require('./app.js');
const assert=require('chai').assert;

describe('test Cinema', () => {
    describe('test showMovies functionality', () => {
        it('showMovies works correctly', () => {
            assert.equal('aa, bb',cinema.showMovies(['aa','bb']));
            assert.equal('There are currently no movies to show.',cinema.showMovies([]));
        })
    });

    describe('test ticketPrice functionality', () => {
        it('ticketPrice works correctly', () => {
            assert.equal(12, cinema.ticketPrice('Premiere'));
            assert.equal(7.5, cinema.ticketPrice('Normal'));
            assert.equal(5.5, cinema.ticketPrice('Discount'));
        })
        it('ticketPrice throws', () => {
            assert.throws(() => cinema.ticketPrice('aa'))
        })
    });
    
    describe('test swapSeatsInHall functionality', () => {
        it('swapSeatsInHall works correctly with invalid input', () => {
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall('a','b'));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall('1',10));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(1,'10'));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(10.2,12));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(10,10));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(-10,10));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(10,-10));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(21,10));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(10,21));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(0,10));
            assert.equal('Unsuccessful change of seats in the hall.',cinema.swapSeatsInHall(10,0));
        })
        it('swapSeatsInHall works correctly with valid input', () => {
            assert.equal('Successful change of seats in the hall.',cinema.swapSeatsInHall(10,12));
            assert.equal('Successful change of seats in the hall.',cinema.swapSeatsInHall(5,20));
            assert.equal('Successful change of seats in the hall.',cinema.swapSeatsInHall(20,5));
        })
       
    });
});