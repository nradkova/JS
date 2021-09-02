const router = require('express').Router();


router.get('/',(req,res,next)=>{
    res.render('home/home');
})




module.exports=router;