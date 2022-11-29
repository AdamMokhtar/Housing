const houseRouteDoc = require("./house.doc");
const residentRouteDoc = require("./resident.doc");
const healthRouteDoc = require("./health.doc");

const swaggerDocumentation = {
  openapi: "3.0.3",
  info: {
    version: "1.0.0",
    title: "Housing API",
    description: "My Housing Project Application API using NodeJS",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "local dev",
    },
  ],
  host: "localhost:4000",
  basePath: "/",
  tags: [
    {
      name: "Health",
      description: "Check the health of the API",
    },
    {
      name: "House",
      description: "For the houses in the system",
    },
    {
      name: "Resident",
      description: "For the residents in the system",
    },
  ],
  paths: {
    ...healthRouteDoc,
    ...houseRouteDoc,
    ...residentRouteDoc,
  },
};

module.exports = swaggerDocumentation;
