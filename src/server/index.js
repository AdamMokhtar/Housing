const express = require("express");
const dotenv = require("dotenv");
const bodyParseer = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const { connect } = require("./db");
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("../documentation/swagger");
const houseRouter = require("../routes/houseRoute");
const residentRouter = require("../routes/residentRoute");

//load env config file
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });
const app = express();

//uses
app.use(morgan("dev")); //for logging
app.use(bodyParseer.json()); //pare requests to body parser
app.use(express.urlencoded({ extended: true }));
app.use("/api-doc", swaggerDoc.serve);
app.use("/api-doc", swaggerDoc.setup(swaggerDocumentation));

//set routes
app.use("/house", houseRouter);
app.use("/resident", residentRouter);

const PORT = process.env.PORT || 4040;

const startServer = async () => {
  await connect(process.env.MONGO_URI);

  app.listen(PORT, () => {
    console.log("this API is running on http://localhost:" + PORT);
  });
};
startServer();
