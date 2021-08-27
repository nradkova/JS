module.exports = {
    async post(req, res) {
        const cubeId = req.params.cubeId;
        const comment = {
            author: req.body.author,
            content: req.body.content,
        };
        try {
            await req.storage.createComment(cubeId,comment);
            res.redirect('/details/'+cubeId);

        } catch (error) {
            if (error.name == "ValidationError") {
                return res.render('create', { title: 'Create Cube Page', error: 'All fields are required. Image URL must be a valid URL.' })
            }
        }
    }
};