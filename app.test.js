const request = require('supertest');
const app = require('./backend/app'); // Adjust the path if necessary

console.log(app)

  it('should create a new note', async () => {
    const res = await request(app)
      .post('/notes')
      .send({
        noteTitle: 'Test Note',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('note');
  });

  describe('Notes API', () => {
    it('should get all notes', async () => {
      const res = await request(app).get('/notes');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('notes');
    });
  
    it('should get a note by ID', async () => {
      const res = await request(app).get('/notes/1'); // Adjust the ID as necessary
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('note');
    });

  it('should update a note', async () => {
    const res = await request(app)
      .put('/notes/1') // Adjust the ID as necessary
      .send({
        noteTitle: 'Updated Note',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('note');
  });

  it('should delete a note', async () => {
    const res = await request(app).delete('/notes/1'); // Adjust the ID as necessary
    expect(res.statusCode).toEqual(204);
  });
});