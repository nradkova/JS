module.exports = {
   async edit(req, res) {
        const cube = await req.storage.getById(req.params.id);
        if(cube){
            cube['level'+cube.difficulty]=true;
            const ctx={
                title:'Edit Cube Page',
                cube
            }
            res.render('edit', ctx);
        }else{
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty:Number( req.body.difficulty)
        };
        try {
            await req.storage.edit(req.params.id,cube); 
            res.redirect('/');
        } catch (error) {
            res.redirect('/404');
        }
    }
};