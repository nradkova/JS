function createAssemblyLine() {
    const assemblyLine = {};
    assemblyLine.hasClima = hasClima;
    assemblyLine.hasAudio = hasAudio;
    assemblyLine.hasParktronic = hasParktronic;

    return assemblyLine;

    function hasClima(car) {
        car.temp = 21;
        car.tempSettings = 21;
        car.adjustTemp = adjustTemp;
    }
    function hasAudio(car){
        car.currentTrack = null;
        car.nowPlaying = nowPlaying;
    }
    function hasParktronic(car) {
        car.checkDistance=checkDistance;
    }

    function adjustTemp() {
        if (this.temp < this.tempSettings) {
            this.temp++;
        } else if (this.temp > this.tempSettings) {
            this.temp--;
        }
    }
    function nowPlaying() {
        if (this.currentTrack!==null) {
           console.log(`Now playing '${this.currentTrack.name}' by ${this.currentTrack.artist}`);
        }
    }
    function checkDistance(distance) {
        if (distance < 0.1) {
            console.log('Beep! Beep! Beep!');
          return;
        }
        if (distance >= 0.1 && distance < 0.25) {
            console.log('Beep! Beep!');
            return;
        }
        if (distance >= 0.25 && distance < 0.5) {
            console.log('Beep!');
            return;
        }
        console.log('');
    }
}

const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};
assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);

assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();

assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);

console.log(myCar);
