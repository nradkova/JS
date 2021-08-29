const { Router } = require('express');
const { isGuest, isAuth } = require('../middlewares/guards');
const router = Router();

router.get('/register',isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register',isGuest(),  async (req, res) => {
    try {
        await req.auth.register(req.body);
        res.redirect('/products');
    } catch (error) {
        const ctx = {
            title: 'Register Page',
            error: error.message,
            data: { username: req.body.username }
        };
        res.render('register', ctx);
    };
});

router.get('/login',isGuest(),  (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body);
        res.redirect('/products');
    } catch (error) {
        const ctx = {
            title: 'Login Page',
            error: error.message,
            data: { username: req.body.username }
        };
        res.render('login', ctx);
    };
});

router.get('/logout',isAuth(), (req, res) => {
    req.auth.logout();
    res.redirect('/products');
});

module.exports = router;