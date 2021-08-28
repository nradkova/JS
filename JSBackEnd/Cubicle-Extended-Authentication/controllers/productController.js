const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const cubes = await req.storage.getAll(req.query);
    const ctx = {
        title: 'Cubicle',
        cubes,
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to || ''
    }
    res.render('catalog', ctx);
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

router.post('/create', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty)
    };
    try {
        await req.storage.create(cube);
        res.redirect('/');

    } catch (error) {
        if (error.name == "ValidationError") {
            return res.render('create', { title: 'Create Cube Page', error: 'All fields are required. Image URL must be a valid URL.' })
        }
        res.redirect('/404');
    }
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await req.storage.getById(id);
    if (cube) {
        const ctx = {
            title: 'Cubicle',
            cube
        }
        res.render('details', ctx);
    } else {
        res.redirect('/404');
    }
});

router.get('/edit/:id', async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    if (cube) {
        cube['level' + cube.difficulty] = true;
        const ctx = {
            title: 'Edit Cube Page',
            cube
        }
        res.render('edit', ctx);
    } else {
        res.redirect('/404');
    }
});

router.post('/edit/:id', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty)
    };
    try {
        await req.storage.edit(req.params.id, cube);
        res.redirect('/');
    } catch (error) {
        if (error.name == "ValidationError") {
            cube._id = req.params.id;
            const ctx = {
                title: 'Edit Cube Page',
                error: 'All fields are required. Image URL must be a valid URL.',
                cube
            }
            return res.render('edit', ctx)
        }
        res.redirect('/404');
    }
});
router.get('/details/attach/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await req.storage.getById(id);
    const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(x => x._id));
    if (cube) {
        const ctx = {
            title: 'Attach New Accessory',
            cube,
            accessories
        }
        res.render('attachAccessory', ctx);
    } else {
        res.redirect('/404');
    }
});

router.post('/details/attach/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const accessoryId = req.body.accessory;
    try {
        await req.storage.attachAccessory(cubeId, accessoryId);
        res.redirect('/products/details/' + cubeId);
    } catch (error) {
        res.redirect('/404');
    }
});
module.exports = router;