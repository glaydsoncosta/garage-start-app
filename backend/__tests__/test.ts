const app = require("../src/server");
const supertest = require('supertest');
const request = supertest(app);

describe('jest', () => {

  it('should pass if jest working', () => {
    expect(true).toBe(true)
  })

  it('it should return a list of cars from API', async done => {
    const response = await request.get('/cars');
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBeGreaterThan(0);
    done();
  });

  it('it should return information of car with id 10', async done => {
    const response = await request.get('/car/10');
    expect(response.status).toBe(200)
    expect(response.body.data[0].maker_id).toBe(4);
    done();
  });  
})