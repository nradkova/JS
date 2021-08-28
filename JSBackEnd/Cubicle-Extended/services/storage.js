const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');

async function init() {
    return (req, res, next) => {
        req.storage = {
            init,
            getAll,
            getById,
            create,
            edit,
            createComment,
            createAccessory,
            getAllAccessories,
            attachAccessory
        }
        next();
    }
}

//return promise
async function getAll(query) {
    const seachParams = {
        'name': { $regex: query.search || '', $options: 'i' },
        'difficulty': { $gte: Number(query.from) || 0, $lte: Number(query.to) || 6 }
    };
    const cubes = Cube.find(seachParams).lean();
    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id).populate('comments').populate('accessories').lean();
    if (cube) {
        return cube;
    }
    return undefined;
}

async function create(cube) {
    const record = new Cube(cube);
    return record.save();
}

async function edit(id, cube) {
    const current = await Cube.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
    Object.assign(current, cube);
    return current.save();
}

async function createComment(cubeId,data) {
    const cube = await Cube.findById(cubeId);
    if (!cube) {
        throw new ReferenceError('No such data');
    }
    const comment=new Comment(data);
    await comment.save();
    cube.comments.push(comment);
    await cube.save();
}

async function createAccessory(data) {
    const accessory = new Accessory(data);
    return accessory.save();
}

async function getAllAccessories(data) {
    return Accessory.find({_id:{$nin:data}}).lean();
}

async function attachAccessory(cubeId,accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    if (!cube||!accessory) {
        throw new ReferenceError('No such data');
    }
    cube.accessories.push(accessory);
    await cube.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit,
    createComment,
    createAccessory,
    getAllAccessories,
    attachAccessory
}