const Accessory = require('../models/Accessory');

async function createAccessory(data) {
    const accessory = new Accessory(data);
    return accessory.save();
}

async function getAllAccessories(data) {
    return Accessory.find({_id:{$nin:data}}).lean();
}

module.exports = {
    createAccessory,
    getAllAccessories,
}