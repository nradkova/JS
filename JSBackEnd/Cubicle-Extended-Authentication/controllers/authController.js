const { Router } = require('express');
const router = Router();

router.get('/register', (req,res)=>{
    res.render('register',{title:'Register Page'});
});

router.post('/register',async (req,res)=>{
    try {
        await req.auth.register(req.body);
        res.redirect('/products');
    } catch (error) {
        const ctx={
            title:'Register Page',
            error:error.message,
            data:{username:req.body.username}
        };
        res.render('register',ctx);
    };
});

router.get('/login', (req, res)=> {
    res.render('login',{title:'Login Page'});
});

router.post('/login', async(req,res)=>{
    try {
        await req.auth.login(req.body);
        res.redirect('/products');
    } catch (error) {
        const ctx={
            title:'Login Page',
            error:error.message,
            data:{username:req.body.username}
        };
        res.render('login',ctx);
    };
});

router.get('/logout', (req, res)=> {
    res.redirect('/products');
});

module.exports = router;