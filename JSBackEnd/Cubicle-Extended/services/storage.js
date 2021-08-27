const Cube = require('../models/Cube');
const Comment = require('../models/Comment');

async function init() {
    return (req, res, next) => {
        req.storage = {
            init,
            getAll,
            getById,
            create,
            edit,
            createComment
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
    const cube = await Cube.findById(id).populate('comments').lean();
    console.log(cube)
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

async function createComment(cubeId,comment) {
    const cube = await Cube.findById(cubeId);
    if (!cube) {
        throw new ReferenceError('No such data');
    }
    const newComment=new Comment(comment);
    await newComment.save();
    cube.comments.push(newComment);
    await cube.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit,
    createComment
}