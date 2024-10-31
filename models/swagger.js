const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'DnD Notes API',
            version: '0.0.1',
            description: 'App to take notes during a TTRPG campaign',
            contact: {
                name: "The Obstinate Panda",
                url: "http://www.opwebdev.com",
                email: "admin@opwebdev.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
        ],
    },
    apis: [path.join(__dirname, "./routes/server.js")], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};