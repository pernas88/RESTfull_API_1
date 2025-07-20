const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      tittle: "Primera API",
      version: "1.0.0",
      descripcion: "Descripcion de la API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./router/*.js"],
};

const swagger = swaggerJSDoc(options);

module.exports = swagger;
