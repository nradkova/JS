const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');


async function getAll(query) {
    const seachParams = {
        'name': { $regex: query.search || '', $options: 'i' },
        'difficulty': { $gte: Number(query.from) || 0, $lte: Number(query.to) || 6 }
    };
    const cubes = Cube.find(seachParams).lean();
    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id)
        .populate('comments')
        .populate('accessories')
        .populate('creator')
        .lean();
    if (cube) {
        const viewModel = {
            _id: cube._id,
            name: cube.name,
            description: cube.description,
            imageUrl: cube.imageUrl,
            difficulty: cube.difficulty,
            comments: cube.comments,
            accessories: cube.accessories,
            creator: cube.creator.username,
            creatorId:cube.creator._id.toString()
        }
        return viewModel;
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

async function del(id) {
    const current = await Cube.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
  return Cube.deleteOne({_id:id});
}

async function createComment(cubeId, data) {
    const cube = await Cube.findById(cubeId);
    if (!cube) {
        throw new ReferenceError('No such data');
    }
    const comment = new Comment(data);
    await comment.save();
    cube.comments.push(comment);
    await cube.save();
}

async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    if (!cube || !accessory) {
        throw new ReferenceError('No such data');
    }
    cube.accessories.push(accessory);
    return cube.save();
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    createComment,
    attachAccessory,
    del
}