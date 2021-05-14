function solve(...input) {
    let [steps, footPrint, speedKm] = input;
    steps = Number(steps);
    footPrint = Number(footPrint);
    speedKm = Number(speedKm);

    let speedM = speedKm / 3.6;
    let distance = steps * footPrint;

    let breaksInSec = Math.trunc(distance / 500) * 60;
    let time = Math.round(distance / speedM) + breaksInSec;

    let hours = Math.trunc(time / 3600);
    let minutes = Math.trunc(time/ 60);
    let seconds = time - hours * 3600 - minutes * 60;

    let hoursFormatted = hours.toString().padStart(2, 0);
    let minutesFormatted = minutes.toString().padStart(2, 0);
    let secondsFormatted = seconds.toString().padStart(2, 0);

    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`
}

console.log(solve(4000, 0.60, 5))
console.log(solve(2564, 0.70, 5.5))
