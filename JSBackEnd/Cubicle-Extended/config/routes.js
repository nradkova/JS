const { about } = require('../controllers/about');
const { catalog } = require('../controllers/catalog');
const { create: createCube, post: cubePost } = require('../controllers/create');
const { details, attach, attachPost } = require('../controllers/details');
const { notFound } = require('../controllers/notFound');
const { edit, post: editPost } = require('../controllers/edit');
const { post: commentPost } = require('../controllers/comments');
const { create: createAccesory, post: accessoryPost } = require('../controllers/accessory');



module.exports = (app) => {
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/create', createCube);
    app.post('/create', cubePost);
    app.get('/details/:id', details);
    app.get('/edit/:id', edit);
    app.post('/edit/:id', editPost);
    app.post('/comments/:cubeId/create', commentPost);
    app.get('/accessories/create', createAccesory);
    app.post('/accessories/create', accessoryPost);
    app.post('/details/:cubeId/attach', attachPost);
    app.get('/details/:id/attach', attach);
    app.all('*', notFound);
}