const databaseConnection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async index(req, res) {
    const ongs = await databaseConnection('ongs').select('*')

    return res.json(ongs);
  },

  async create(req, res) {
      const { name, email, whatsapp, city, uf } = req.body;

      const id = crypto.randomBytes(4).toString('HEX');

      await databaseConnection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });

      return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;

    const ong = await databaseConnection('ongs')
          .where('id', id)
          .first();

    await databaseConnection('ongs').where('id', id).delete();

    return res.status(204).send();
  }

};