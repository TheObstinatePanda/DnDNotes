require('dotenv').config({ path: './.env' })
const request = require('supertest');
const app = require('./backend/app'); // Adjust the path if necessary

// process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/notes';
describe('Notes API', () => {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    //testing for the person table
    it('should create a new note and person', async () => {
        // Insert data into notes table with default values
        const noteRes = await request(app)
            .post('/notes');
        expect(noteRes.statusCode).toEqual(201);
        const note_id = noteRes.body.note.id;
    // });

    // it ('should insert data into the people table', async () => {
        // Insert data into the people table
        const peepRes = await request(app)
        .post('/people')
        .send({
            name: 'Jason',
            is_npc: false,
            family: null,
            relations: null,
            orgs: null,
            note: 'My name is Jason',
            note_id: note_id
        });
        //console.log(peepRes);
        expect(peepRes.statusCode).toEqual(201);
    });

    it('should get all people', async () => {
        const res = await request(app).get('/people');
        const createdNote = res.body[res.body.length - 1]
        expect(res.statusCode).toEqual(200);
        expect(createdNote).toHaveProperty('name');
    })

    it('should get a specific person', async () => {
        const res = await request(app).get('/people?name=Steve'); // Adjust the name as necessary
        const person = res.body.find(p => p.name === 'Steve')
        console.log(person);
        expect(res.statusCode).toEqual(200);
        expect(person).toHaveProperty('name');
    });        

    it('should update a specific person', async () => {
        const res = await request(app)
            .put('/people')
            .send({
                name: 'Steve',
                tgtcol: 'note',
                newinfo: 'Steve is his name'
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should delete a Person', async () => {
        const res = await request(app)
            .delete('/people?name=Jason');
        expect(res.statusCode).toEqual(204);
    });
    
    // testing for just the notes table

    // it('should create a new note', async () => {
    //    const res = await request(app)
    //     .post('/notes')
    //    // .send({title: ''});
    //    expect(res.statusCode).toEqual(201);
    // });

    // it('should get all notes', async () => {
    //    const res = await request(app).get('/notes');
    //    const createdNote = res.body[res.body.length - 1]
    //    expect(res.statusCode).toEqual(200);
    //    expect(createdNote).toHaveProperty('title');
    // });
    
    // it('should get a note by note title', async () => {
        // const res = await request(app).get('/notes?title= '); // Adjust the title as necessary
        // const createdNote = res.body.find(p => p.title === '' // may need to be troubleshot
        // expect(res.statusCode).toEqual(200);
        // expect(createdNote).toHaveProperty('title');
    // });

    // it('should update a note', async () => {
    //     const res = await request(app)
    //         .put('/notes')
    //         .send({
    //             orgtitle: '',
    //             newtitle: 'Updated Note'
    //         });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('title', 'Updated Note');
    // });

    // it('should delete a note', async () => {
    //     const res = await request(app)
    //         .delete('/notes?title=Updated Note');
    //     expect(res.statusCode).toEqual(204);
    // });
});