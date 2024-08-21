require('dotenv').config({ path: './.env' })
const request = require('supertest');
const app = require('./backend/app'); // Adjust the path if necessary

// process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/notes';
describe('Notes API', () => {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    it('should create a new note', async () => {
       const res = await request(app)
        .post('/notes')
       // .send({title: ''});
       expect(res.statusCode).toEqual(201);
    });

    it('should get all notes', async () => {
       const res = await request(app).get('/notes');
       const createdNote = res.body[res.body.length - 1]
       expect(res.statusCode).toEqual(200);
       expect(createdNote).toHaveProperty('title');
    });
    
    it('should get a note by note title', async () => {
        const res = await request(app).get('/notes?title= '); // Adjust the title as necessary
        const createdNote = res.body[res.body.length - 1]
        expect(res.statusCode).toEqual(200);
        expect(createdNote).toHaveProperty('title');
    });

    it('should update a note', async () => {
        const res = await request(app)
            .put('/notes')
            .send({
                orgtitle: '',
                newtitle: 'Updated Note'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Note');
    });

    it('should delete a note', async () => {
        const res = await request(app)
            .delete('/notes?title=Updated Note');
        expect(res.statusCode).toEqual(204);
    });
});