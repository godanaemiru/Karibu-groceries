const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path'); // Add this

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Karibu Groceries API',
            version: '1.0.0',
            description: 'API for managing procurement, sales, and users for KGL.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    // Make the path absolute using __dirname
    apis: [path.join(__dirname, './routes/*.js')], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;