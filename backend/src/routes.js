const express = require('express');

const OngController = require('./controllers/OngController');
const CasesController = require('./controllers/CasesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.delete('/ongs/:id', OngController.delete);

routes.get('/cases', CasesController.index);
routes.post('/cases', CasesController.create);
routes.delete('/cases/:id', CasesController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;
