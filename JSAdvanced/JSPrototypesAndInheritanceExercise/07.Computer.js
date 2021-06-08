function createComputerHierarchy() {
    class Component {
        constructor(manufacturer) {
            if (new.target === Component) {
                throw new TypeError;
            }
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Component {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Component {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Component {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new TypeError;
            }
            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }
        set battery(value) {
            if (value instanceof Battery) {
                this._battery = value;
            }else{
                throw new TypeError;
            }
        }
        get battery(){
            return this._battery;
        }
    }

    class Desktop  extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard=keyboard;
            this.monitor=monitor;
        }
        set keyboard(value) {
            if (value instanceof Keyboard) {
                this._keyboard = value;
            }else{
                throw new TypeError;
            }
        }
        get keyboard(){
            return this._keyboard;
        }
        set monitor(value) {
            if (value instanceof Monitor) {
                this._monitor = value;
            }else{
                throw new TypeError;
            }
        }
        get monitor(){
            return this._monitor;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let keyboard = new Keyboard('Logitech', 70);
console.log(keyboard)
let monitor = new Monitor('Benq', 28, 18);
console.log(monitor)

let desktop = new Desktop("JAR Computers", 3.3, 8, 1, keyboard, monitor);
console.log(desktop.manufacturer === "JAR Computers");
console.log(desktop.processorSpeed)//3.3
console.log(desktop.ram === 8);
console.log(desktop.hardDiskSpace === 1);
console.log(desktop.keyboard === keyboard);
console.log(desktop.monitor === monitor);