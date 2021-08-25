const { json } = require('express');
const fs = require('fs/promises');
const uniqid = require('uniqid');

let data = {};
async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (error) {
        alert('Error reading datadase')
    }

    return (req, res, next) => {
        req.storage = {
            init,
            getAll,
            getById,
            create,
            edit
        }
        next();
    }
}
// "a1": {
//   "name": "string",
//   "description": "string",
//   "imageUrl": "string",
//   "difficulty": "number"
//}

async function getAll(query) {
    let cubes = Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
    if (query.search) {
        cubes = cubes.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if (query.from) {
        cubes = cubes.filter(x => x.difficulty >= Number(query.from));
    }
    if (query.to) {
        cubes = cubes.filter(x => x.difficulty <= Number(query.to));
    }
    return cubes;
}

async function getById(id) {
    const cube = data[id];
    if (cube) {
        return Object.assign({}, { id }, cube)
    }
    return undefined;
}

async function create(cube) {
    const id = uniqid();
    data[id] = cube;
    await exist();
}

async function edit(id, cube) {
    console.log(data[id])
    console.log(cube,'ddddd')

    if(!data[id]){
        throw new ReferenceError('No such data');
    }
    data[id] = cube;
    await exist();
}

async function exist() {
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        alert('Error writting out datadase')
    }
}
module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
}