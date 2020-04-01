const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const CasesController = require('./controllers/CasesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
       [Segments.BODY]: Joi.object().keys({
         name: Joi.string().required(),
         email: Joi.string().required().email(),
         whatsapp: Joi.string().required().min(10).max(11),
         city: Joi.string().required(),
         uf: Joi.string().required().length(2)
       })
}), OngController.create);
routes.delete('/ongs/:id', OngController.delete);

routes.get('/cases', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),CasesController.index);
routes.post('/cases', CasesController.create);
routes.delete('/cases/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), CasesController.delete);

routes.get('/profile', celebrate({
       [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown(),
}), ProfileController.index);

module.exports = routes;
