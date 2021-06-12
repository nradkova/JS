function solve(input) {
    const objects = {};

    const objectCreator = {
        create: (name) => objects[name] = {},
        inherit: (name, parentName) => {
            objects[name] = Object.create(objects[parentName]);
        },
        set: (name, prop, value) => objects[name][prop] = value,
        print: (name) => console.log(getAllProp(objects[name]))
    };

    input.forEach(el => {
        let [command, objectName, ...args] = el.split(' ');
        args[0] === 'inherit'
            ? objectCreator[args[0]](objectName, args[1])
            : objectCreator[command](objectName, args[0], args[1]);
    });

    return objects;

    function getAllProp(o) {
        const prop = [];
        for (const key in o) {
            prop.push(`${key}:${o[key]}`);
        }
        return prop.join(', ');
    };
};

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']);