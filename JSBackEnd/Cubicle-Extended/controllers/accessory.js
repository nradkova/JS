module.exports = {
    create(req, res) {
        res.render('createAccessory', { title: 'Create Accessory Page' });
    },
    async post(req, res) {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };
        try {
            await req.storage.createAccessory(accessory);
            res.redirect('/');
            
        } catch (error) {
            console.log(error)
           if(error.name=="ValidationError"){
               return res.render('createAccessory',{ title: 'Create Accessory Page',error:'All fields are required. Image URL must be a valid URL.'})
           }
           res.redirect('/404');
        }
    }
};