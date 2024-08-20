const express = require('express');
const logger = require('morgan');
const notesRouter = require('./routes/server.js'); // Import the routes

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', notesRouter);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).jason({error: 'Internal Server Error' })
})

module.exports = app;