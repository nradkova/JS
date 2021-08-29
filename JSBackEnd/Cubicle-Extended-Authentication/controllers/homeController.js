const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    if (req.query) {
        const cubes = await req.storage.getAll(req.query);
        const ctx = {
            title: 'Cubicle',
            cubes,
            search: req.query.search || '',
            from: req.query.from || '',
            to: req.query.to || ''
        }
        res.render('catalog', ctx);
    } else {
        res.redirect('/products');
    }
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

router.all('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;