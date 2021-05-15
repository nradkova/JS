function solve(car) {
    const {
        model,
        power,
        color,
        carriage,
        wheelsize,
    } = car;

    const engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ];

    let customEngine = engines
        .sort((a, b) => a - b)
        .find(el => el.power >= power);
    let modifiedWheelsize = Math.floor(wheelsize);
    let customWheels = Array(4)
        .fill(wheelsize % 2 === 0 ? wheelsize - 1 : wheelsize, 0, 4);

    return {
        model,
        engine: customEngine,
        carriage: { type: carriage, color: color },
        wheels: customWheels,
    }
}

console.log(solve({
    model: 'Opel Vectra',
  power: 110,
  color: 'grey',
  carriage: 'coupe',
  wheelsize: 17 
}));