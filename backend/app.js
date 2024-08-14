const express = require('express');
const logger = require('morgan');
const notesRouter = require('./routes/server.js'); // Import the routes

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/notes', notesRouter);

module.exports = app;