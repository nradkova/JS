module.exports = {
   async details(req, res) {
       const id=req.params.id;
        const cube=await req.storage.getById(id);
        if(cube){
            const ctx={
                title:'Cubicle',
                cube
            }
            res.render('details',ctx);
        }else{
            res.redirect('/404');
        }
    },
    async attach(req, res) {
        const id=req.params.id;
         const cube=await req.storage.getById(id);
         const accessories=await req.storage.getAllAccessories((cube.accessories||[]).map(x=>x._id));
         if(cube){
             const ctx={
                 title:'Attach New Accessory',
                 cube,
                 accessories
             }
             res.render('attachAccessory',ctx);
         }else{
             res.redirect('/404');
         }
     },
     async attachPost(req, res) {
        const cubeId=req.params.cubeId;
        const accessoryId=req.body.accessory;
        try {
            await req.storage.attachAccessory(cubeId,accessoryId);
            res.redirect('/details/'+cubeId);
        } catch (error) {
            res.redirect('/404');
        }
     }
};