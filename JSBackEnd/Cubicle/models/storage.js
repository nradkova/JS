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

    return (req,res,next)=>{
        req.storage={
            init,
            getAll,
            getById,
            create
        }
        next();
    }
}
// "a1": {
//   "name": "string",
//   "description": "string",
//   "imageUrl": "string",
//   "difficulty": "number"
//},

async function getAll() {
    return Object.entries(data).map(([id, v]) => Object.assign({}, {id }, v));
}

async function getById(id) {
    return data[id];
}

async function create(cube) {
    const id = uniqid();
    data[id] = cube;
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data,null,2));
    } catch (error) {
        alert('Error writting out datadase')
    }
}

module.exports={
    init,
    getAll,
    getById,
    create
}