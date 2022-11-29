const express = require("express");
const bodyParseer = require("body-parser");
const morgan = require("morgan");
const houseRouter = require("../routes/houseRoute");
const residentRouter = require("../routes/residentRoute");
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("../documentation/swagger");
const healthCheck = require("../routes/health");
const app = express();

//uses
app.use(morgan("dev")); //for logging
app.use(bodyParseer.json()); //pare requests to body parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/house", houseRouter);
app.use("/resident", residentRouter);
app.use("/healthcheck", healthCheck);
//swagger
app.use("/api-doc", swaggerDoc.serve);
app.use("/api-doc", swaggerDoc.setup(swaggerDocumentation));

module.exports = app;
