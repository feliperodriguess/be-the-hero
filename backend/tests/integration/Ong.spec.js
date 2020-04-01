const req = require('supertest');
const app = require('../../src/app');
const databaseConnection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await databaseConnection.migrate.rollback();
    await databaseConnection.migrate.latest();
  })

  afterAll(async () => {
    await databaseConnection.destroy();
  })

  it('Should be able to create a new ONG', async () => {
    const response = await req(app)
    .post('/ongs')
    .send({
      name: "Ong 1",
      email: "contato@gmail.com",
      whatsapp: "48991456815",
      city: "Floripa",
      uf: "SC"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

  });
});