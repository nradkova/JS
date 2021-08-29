module.exports = {
    async post(req, res) {
        const cubeId = req.params.cubeId;
        const comment = {
            author: req.body.author,
            content: req.body.content,
        };
        try {
            await req.storage.createComment(cubeId,comment);
            res.redirect('/products');
        } catch (error) {
            if (error.name == "ValidationError") {
                return res.render('details', { title: 'Details Cube Page', error: 'All fields are required.' })
            }
            res.redirect('/404');
        }
    }
};