(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }

    Array.prototype.skip = function (n) {
        if (Number.isInteger(n) && n > 0) {
            return this.slice(n);
        } else if (n === 0) {
            return this;
        } else {
            throw new Error();
        }
    }

    Array.prototype.take = function (n) {
        if (Number.isInteger(n) && n >= 0) {
            return this.slice(0, n);
        } else {
            throw new Error();
        }
    }

    Array.prototype.sum = function () {
        return this.reduce((a, b) => a + b, 0);
    }

    Array.prototype.average = function () {
        return this.sum() / this.length;
    }

})();

var testArray = [1, 2, 3];

console.log(Array.prototype.hasOwnProperty('last'));
console.log(testArray.skip(0));