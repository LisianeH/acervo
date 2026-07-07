const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Acervo",
      version: "1.0.0",
      description:
        "API para gerenciamento de filmes, usuários, gêneros e streamings."
    },
    servers: [
      {
        url: "http://localhost:3002/api"
      }
    ]
  },
  apis: [path.resolve(__dirname, "..", "router", "*.js").replace(/\\/g, "/")]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};