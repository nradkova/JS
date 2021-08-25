module.exports = {
   async details(req, res) {
        const cube=await req.storage.getById(req.params.id);
        if(cube){
            const ctx={
                title:'Cubicle',
                cube
            }
            res.render('details',ctx);
        }else{
            res.redirect('/404');
        }
    }
};