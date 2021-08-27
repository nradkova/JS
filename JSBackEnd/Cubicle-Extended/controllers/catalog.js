module.exports = {
    async catalog(req, res) {
        const cubes = await req.storage.getAll(req.query);
        const ctx = {
            title: 'Cubicle',
            cubes,
            search: req.query.search || '',
            from: req.query.from || '',
            to: req.query.to || ''
        }
        res.render('catalog', ctx);
    }
};