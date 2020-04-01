const databaseConnection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [totalCases] = await databaseConnection('cases').count();

    const cases = await databaseConnection('cases')
          .join('ongs', 'ongs.id', '=', 'cases.ong_id')
          .limit(5)
          .offset((page -1)*5)
          .select([ 
                  'cases.*', 
                  'ongs.name', 
                  'ongs.email', 
                  'ongs.whatsapp', 
                  'ongs.city', 
                  'ongs.uf']);

    res.header('X-Total-Count', totalCases['count(*)']);

    return res.json(cases);
  },

  async create(req, res) {
    const { title, description, value} = req.body;
    const ong_id = req.headers.authorization

    const [id] = await databaseConnection('cases').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const cause = await databaseConnection('cases')
          .where('id', id)
          .select('ong_id')
          .first();

    if (cause.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not authorized.'});
    }

    await databaseConnection('cases').where('id', id).delete();

    return res.status(204).send();
  }
}