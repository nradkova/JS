(function solve() {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return this.toString();
    }

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }
        return this.toString();
    }

    String.prototype.isEmpty = function () {
        if (this.length === 0) {
            return true;
        }
        return false;
    }

    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return this.toString();
        }
        if (this.length > n) {
            if (this.includes(' ')) {
                let spaceInd = this.indexOf(' ');
                let nextSpaceInd = this.indexOf(' ', spaceInd + 1);
                while (nextSpaceInd > 0 && nextSpaceInd + 3 <= n) {
                    spaceInd = nextSpaceInd;
                    nextSpaceInd = this.indexOf(' ', spaceInd + 1);
                }
                return this.slice(0, spaceInd) + '...';
            } else {
                if (n < 4) {
                    return '.'.repeat(n);
                }
                return this.slice(0, n - 3) + '...';
            }
        }
    }

    String.format = function (string, ...params) {
        let placeholderInd = 0;
        return string
            .split(' ')
            .map(word => {
                if (word === `{${placeholderInd}}` && params[placeholderInd]) {
                    word = params[placeholderInd];
                    placeholderInd++;
                }
                return word;
            })
            .join(' ');
    }
})();

var testString = 'quick brown fox';

var answer = testString.ensureStart('the ');
console.log(answer)

console.log(answer === 'the quick brown fox');
answer = answer.ensureStart('the ');
console.log(answer)
console.log(answer === 'the quick brown fox');

let str = 'my string';
str = str.ensureStart('my');

str = str.ensureStart('hello ');
console.log(str)

str = str.truncate(16);
console.log(str)

str = str.truncate(14);
console.log(str)

str = str.truncate(8);
console.log(str)

str = str.truncate(4);
console.log(str)

str = str.truncate(2);
console.log(str)

str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str)

str = String.format('jumps {0} {1}', 'dog');
console.log(str)
