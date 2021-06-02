function solve(arr, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        };
        static compare(a, b, criteria) {
            if (typeof a[criteria] === 'string') {
                return a[criteria].localeCompare(b[criteria]);
            }
            if (typeof a[criteria] === 'number') {
                return b - a;
            }
        };
    };
    return arr
        .map(line => { return new Ticket(...line.split('|'))})
        .sort((a, b) => Ticket.compare(a, b, criteria));
};

console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'price'))
console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'status'))