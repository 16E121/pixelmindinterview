const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config()
const doc = {
    info: {
        title: 'Sample API',
        description: 'interview',
        version: '1.0.0'
    },
    servers: [
        {
            url: `http://${process.env.LIVE_HOST}:${process.env.LIVE_PORT}`,
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "apiKey",
                name: "x-auth-token",
                type: "http",
                scheme: "bearer",
                in: "header",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],

}

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./index.js', './controllers/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
