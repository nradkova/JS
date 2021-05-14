function solve(...input) {

    let [speed, area] = input;
    speed = Number(speed);

    const areasLimits = {
        'motorway': 130,
        'interstate': 90,
        'city': 50,
        'residential': 20
    }

    let currentLimit = areasLimits[area];

    if (speed <= currentLimit) {
        return `Driving ${speed} km/h in a ${currentLimit} zone`;

    } else {
        let difference = speed - currentLimit;
        let status = undefined;

        if (difference <= 20) {
            status = 'speeding';

        } else if (difference <= 40) {
            status = 'excessive speeding';

        } else {
            status = 'reckless driving';
        }
        return `The speed is ${difference} km/h faster than the allowed speed of ${currentLimit} - ${status}`;
    }
}

console.log(solve(40, 'city'))
console.log(solve(21, 'residential'))
