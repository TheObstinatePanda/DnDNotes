const express = require('express');
const logger = require('morgan');
const notesRouter = require('./routes/server.js'); // Import the routes
const {swaggerUi, specs } = require('./swagger'); //Import swagger

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', notesRouter);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error' })
})

module.exports = app;