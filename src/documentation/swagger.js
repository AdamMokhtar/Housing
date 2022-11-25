const houseRouteDoc = require("./house.doc");
const residentRouteDoc = require("./resident.doc");

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
  host: "localhost:3000",
  basePath: "/",
  tags: [
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
    ...houseRouteDoc,
    ...residentRouteDoc,
  },
};

module.exports = swaggerDocumentation;
