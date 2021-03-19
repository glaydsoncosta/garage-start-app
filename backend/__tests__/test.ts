const app = require("../src/server");
const supertest = require('supertest');
const request = supertest(app);

describe('jest', () => {

  it('should pass if jest working', () => {
    expect(true).toBe(true)
  })

  it('API should return a list of Cars', async done => {
    const response = await request.get('/cars');
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBeGreaterThan(0);
    done();
  });

  it('API should return information of car with ID = 10', async done => {
    const response = await request.get('/car/10');
    expect(response.status).toBe(200)
    expect(response.body.data[0].maker_id).toBe(4);
    done();
  });
  
  it('API should MARK as starred car with ID = 10', async done => {
    const response = await request.post('/car/10/star/1');
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true);
    done();
  });

  it('Car with ID = 10 should be marked as starred', async done => {
    const response = await request.get('/car/10');
    expect(response.status).toBe(200)
    expect(response.body.data[0].starred).toBe(1);
    done();
  });  

  it('API should MARK as unstarred car with ID = 10', async done => {
    const response = await request.post('/car/10/star/0');
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true);
    done();
  });

  it('Car with ID = 10 should be marked as unstarred', async done => {
    const response = await request.get('/car/10');
    expect(response.status).toBe(200)
    expect(response.body.data[0].starred).toBe(0);
    done();
  });
  
})