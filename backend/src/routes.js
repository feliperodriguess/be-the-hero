const express = require('express');

const routes = express.Router();

const validateBody = require('./utils/validators/validateBody');
const validateParams = require('./utils/validators/validateParams');
const validateQuery = require('./utils/validators/validateQuery');
const validateHeaders = require('./utils/validators/validateHeaders');

const OngController = require('./controllers/OngController');
const CasesController = require('./controllers/CasesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', validateBody, OngController.create);
routes.delete('/ongs/:id', OngController.delete);

routes.get('/cases', validateQuery, CasesController.index);
routes.post('/cases', CasesController.create);
routes.delete('/cases/:id', validateParams, CasesController.delete);

routes.get('/profile', validateHeaders, ProfileController.index);

module.exports = routes;
