const express = require('express');
const app = express();
const logger = require('morgan');
require('dotenv').config();

const notesRouter = require('./controllers/routes'); // Import the routes
const {swaggerUi, specs } = require('./models/swagger'); //Import swagger

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

const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.DB_APP_PORT || '8000');
app.set('port', port);

const http = require('http');
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

module.exports = app;