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
            if(error.name=="ValidationError"){
                cube._id=req.params.id;
                const ctx={
                    title:'Edit Cube Page',
                    error:'All fields are required. Image URL must be a valid URL.',
                    cube
                }
              return res.render('edit',ctx)
            }
            res.redirect('/404');
        }
    }
};