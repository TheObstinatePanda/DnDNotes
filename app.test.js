require('dotenv').config({ path: './.env' })
const request = require('supertest');
const app = require('./backend/app'); // Adjust the path if necessary

// process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/notes';
describe('Notes API', () => {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    //testing for the person table
    // it('should create a new note and person', async () => {
    //     // Insert data into notes table with default values
    //     const noteRes = await request(app)
    //         .post('/notes');
    //     expect(noteRes.statusCode).toEqual(201);
    //     const note_id = noteRes.body.note.id;
    // // });

    // // it ('should insert data into the people table', async () => {
    //     // Insert data into the people table
    //     const peepRes = await request(app)
    //     .post('/people')
    //     .send({
    //         name: 'Jason',
    //         is_npc: false,
    //         family: null,
    //         relations: null,
    //         orgs: null,
    //         note: 'My name is Jason',
    //         note_id: note_id
    //     });
    //     //console.log(peepRes);
    //     expect(peepRes.statusCode).toEqual(201);
    // });

    // it('should get all people', async () => {
    //     const res = await request(app).get('/people');
    //     const createdNote = res.body[res.body.length - 1]
    //     expect(res.statusCode).toEqual(200);
    //     expect(createdNote).toHaveProperty('name');
    // })

    // it('should get a specific person', async () => {
    //     const res = await request(app).get('/people?name=Steve'); // Adjust the name as necessary
    //     const person = res.body.find(p => p.name === 'Steve')
    //     console.log(person);
    //     expect(res.statusCode).toEqual(200);
    //     expect(person).toHaveProperty('name');
    // });        

    // it('should update a specific person', async () => {
    //     const res = await request(app)
    //         .put('/people')
    //         .send({
    //             name: 'Steve',
    //             tgtcol: 'note',
    //             newinfo: 'Steve is his name'
    //         });
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('should delete a Person', async () => {
    //     const res = await request(app)
    //         .delete('/people?name=Jason');
    //     expect(res.statusCode).toEqual(204);
    // });

    // testing for the place route

    // it('should create a new note and person', async () => {
    //     // Insert data into notes table with default values
    //     const noteRes = await request(app)
    //         .post('/notes');
    //     expect(noteRes.statusCode).toEqual(201);
    //     const note_id = noteRes.body.note.id;
    // // });

    // // it ('should insert data into the people table', async () => {
    //     // Insert data into the people table
    //     const plaRes = await request(app)
    //     .post('/place')
    //     .send({
    //         name: 'Oarus Ghein',
    //         location: 'The Khadrossian Flatlands',
    //         type: 'Trade City',
    //         orgs: null,
    //         owned_by: null,
    //         note: 'Oarus Ghein is a trade hub between the cities of the east and the cities of the south.',
    //         note_id: note_id
    //     });
    //     //console.log(peepRes);
    //     expect(plaRes.statusCode).toEqual(201);
    // });

    // it('should get all places', async () => {
    //     const res = await request(app).get('/place');
    //     const createdNote = res.body[res.body.length - 1]
    //     expect(res.statusCode).toEqual(200);
    //     expect(createdNote).toHaveProperty('name');
    // })

    // it('should get a specific place', async () => {
    //     const res = await request(app).get('/place?name=Oarus Ghein'); // Adjust the name as necessary
    //     const place = res.body.find(p => p.name === 'Oarus Ghein')
    //     console.log([place]);
    //     expect(res.statusCode).toEqual(200);
    //     expect(place).toHaveProperty('name');
    // });        

    // it('should update a specific person', async () => {
    //     const res = await request(app)
    //         .put('/place')
    //         .send({
    //             name: 'Oarus Ghein',
    //             tgtcol: 'location',
    //             newinfo: 'North of Oarus Khadi'
    //         });
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('should delete a Place', async () => {
    //     const res = await request(app)
    //         .delete('/place?name=Oarus Ghein');
    //     expect(res.statusCode).toEqual(204);
    // });

    // testing for just the thing table

    // it('should create a new note and person', async () => {
    //     // Insert data into notes table with default values
    //     const noteRes = await request(app)
    //         .post('/notes');
    //     expect(noteRes.statusCode).toEqual(201);
    //     const note_id = noteRes.body.note.id;
    // // });

    // // it ('should insert data into the people table', async () => {
    //     // Insert data into the people table
    //     const thiRes = await request(app)
    //     .post('/thing')
    //     .send({
    //         name: '+2 Longsword of Reaping',
    //         type: 'Longsword',
    //         is_magic: true,
    //         owned_by: null, 
    //         description: 'A 6ft straight blade, light as a rapier despite its mass...', 
    //         note: 'Acquired when fighting the Metatron in Elysium',
    //         note_id: note_id
    //     });
    //     //console.log(peepRes);
    //     expect(thiRes.statusCode).toEqual(201);
    // });

    // it('should get all things', async () => {
    //     const res = await request(app).get('/thing');
    //     const createdNote = res.body[res.body.length - 1]
    //     expect(res.statusCode).toEqual(200);
    //     expect(createdNote).toHaveProperty('name');
    // })

    // it('should get a specific thing', async () => {
    //     const res = await request(app).get('/thing?name=+2 Longsword of Reaping'); // Adjust the name as necessary
    //     const item = res.body.find(p => p.name === '+2 Longsword of Reaping')
    //     console.log([item]);
    //     expect(res.statusCode).toEqual(200);
    //     expect(item).toHaveProperty('name');
    // });        

    // it('should update a specific thing', async () => {
    //     const res = await request(app)
    //         .put('/thing')
    //         .send({
    //             name: '+2 Longsword of Reaping',
    //             tgtcol: 'is_magic',
    //             newinfo: false
    //         });
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('should delete a thing', async () => {
    //     const res = await request(app)
    //         .delete('/thing?name=%2B2%20Longsword%20of%20Reaping');
    //     expect(res.statusCode).toEqual(204);
    // });

    // testing for just the fam table

    // it('should create a new note and person', async () => {
    //     // Insert data into notes table with default values
    //     const noteRes = await request(app)
    //         .post('/notes');
    //     expect(noteRes.statusCode).toEqual(201);
    //     const note_id = noteRes.body.note.id;
    // // });

    // // it ('should insert data into the fam table', async () => {
    //     // Insert data into the people table
    //     const famRes = await request(app)
    //     .post('/fam')
    //     .send({
    //         name: 'Newman',
    //         status: 'Commoners',
    //         family_members: [],
    //         orgs: null,
    //         relations: null,
    //         lives_in: 'Bowie MD',
    //         note: 'The Newman family',
    //         note_id: note_id
    //     });
    //     //console.log(peepRes);
    //     expect(famRes.statusCode).toEqual(201);
    // });

    // it('should get all families', async () => {
    //     const res = await request(app).get('/fam');
    //     const createdNote = res.body[res.body.length - 1]
    //     expect(res.statusCode).toEqual(200);
    //     expect(createdNote).toHaveProperty('name');
    // })

    // it('should get a specific famil', async () => {
    //     const res = await request(app).get('/fam?name=Newman'); // Adjust the name as necessary
    //     const item = res.body.find(p => p.name === 'Newman')
    //     console.log([item]);
    //     expect(res.statusCode).toEqual(200);
    //     expect(item).toHaveProperty('name');
    // });        

    // it('should update a specific thing', async () => {
    //     const res = await request(app)
    //         .put('/fam')
    //         .send({
    //             name: 'Newman',
    //             tgtcol: 'lives_in',
    //             newinfo: 'Olney'
    //         });
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('should delete a thing', async () => {
    //     const res = await request(app)
    //         .delete('/fam?name=Newman');
    //     expect(res.statusCode).toEqual(204);
    // });

    // testing for just the org table

    // it('should create a new note and org', async () => {
    //     // Insert data into notes table with default values
    //     const noteRes = await request(app)
    //         .post('/notes');
    //     expect(noteRes.statusCode).toEqual(201);
    //     const note_id = noteRes.body.note.id;
    // // });

    // // it ('should insert data into the org table', async () => {
    //     // Insert data into the people table
    //     const orgRes = await request(app)
    //     .post('/org')
    //     .send({
    //         name: 'Thieves Guild',
    //         type: 'Guild', 
    //         members: [],
    //         relations: null,
    //         found_in: ['All major cities, some minor.'],
    //         note:'Guild in Oarus Khadi operates mostly out of the caverns beneath the city',
    //         note_id: note_id
    //     });
    //     //console.log(peepRes);
    //     expect(orgRes.statusCode).toEqual(201);
    // });

    // it('should get all organizations', async () => {
    //     const res = await request(app).get('/org');
    //     const createdNote = res.body[res.body.length - 1]
    //     expect(res.statusCode).toEqual(200);
    //     expect(createdNote).toHaveProperty('name');
    // })

    // it('should get a specific organizations', async () => {
    //     const res = await request(app).get('/org?name=Thieves Guild'); // Adjust the name as necessary
    //     const org = res.body.find(p => p.name === 'Thieves Guild')
    //     console.log([org]);
    //     expect(res.statusCode).toEqual(200);
    //     expect(org).toHaveProperty('name');
    // });        

    // it('should update a specific organization', async () => {
    //     const res = await request(app)
    //         .put('/org')
    //         .send({
    //             name: 'Thieves Guild',
    //             tgtcol: 'note',
    //             newinfo: 'The cheese stands alone!'
    //         });
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('should delete a thing', async () => {
    //     const res = await request(app)
    //         .delete('/org?name=Thieves%20Guild');
    //     expect(res.statusCode).toEqual(204);
    // });
    
    // testing for just the events table

    it('should create a new note and event', async () => {
        // Insert data into notes table with default values
        const noteRes = await request(app)
            .post('/notes');
        expect(noteRes.statusCode).toEqual(201);
        const note_id = noteRes.body.note.id;
    // });

    // it ('should insert data into the org table', async () => {
        // Insert data into the people table
        const eveRes = await request(app)
        .post('/event')
        .send({
            name: 'Battle of Baldwyn Gorge',
            persons_involved: [], 
            location: 'Baldwin Gorge',
            is_combat: true,
            loot: [],
            note:'A clash in Baldwin Gorge',
            note_id: note_id
        });
        //console.log(peepRes);
        expect(eveRes.statusCode).toEqual(201);
    });

    it('should get all events', async () => {
        const res = await request(app).get('/event');
        const createdNote = res.body[res.body.length - 1]
        expect(res.statusCode).toEqual(200);
        expect(createdNote).toHaveProperty('name');
    })

    it('should get a specific events', async () => {
        const res = await request(app).get('/event?name=Battle of Baldwyn Gorge'); // Adjust the name as necessary
        const org = res.body.find(p => p.name === 'Battle of Baldwyn Gorge')
        console.log([org]);
        expect(res.statusCode).toEqual(200);
        expect(org).toHaveProperty('name');
    });        

    it('should update a specific events', async () => {
        const res = await request(app)
            .put('/event')
            .send({
                name: 'Battle of Baldwyn Gorge',
                tgtcol: 'name',
                newinfo: 'Down with imperial scum!'
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should delete an event', async () => {
        const res = await request(app)
            .delete('/event?name=Down%20with%20imperial%20scum%21');
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