module.exports = {
   async details(req, res) {
       const id=req.params.id;
        const cube=await req.storage.getById(id);
        if(cube){
            const ctx={
                title:'Cubicle',
                cube,
            }
            res.render('details',ctx);
        }else{
            res.redirect('/404');
        }
    }
};