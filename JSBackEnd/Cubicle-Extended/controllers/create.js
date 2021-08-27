module.exports = {
    create(req, res) {
        res.render('create', { title: 'Create Cube Page' });
    },
    async post(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty:Number( req.body.difficulty)
        };
        try {
            await req.storage.create(cube);
            res.redirect('/');
            
        } catch (error) {
           if(error.name=="ValidationError"){
               return res.render('create',{ title: 'Create Cube Page',error:'All fields are required. Image URL must be a valid URL.'})
           }
        }
    }
};