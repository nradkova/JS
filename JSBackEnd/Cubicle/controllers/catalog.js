module.exports = {
   async catalog(req, res) {
        const cubes=await req.storage.getAll();
        const ctx={
            title:'Cubicle',
            cubes
        }
        res.render('index',ctx);
    }
};