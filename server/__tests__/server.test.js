const request = require('supertest');
const app = require('../app.js');

xdescribe('(x) routes', () => {

  test('Expect ...', async () => {
    await request(app)
      .get(/* ENDPOINT */)
      .query(/* QUERY */)
      .then((success) => {
        expect(true).toBe(true);
      });
  });

});
