const dotenv = require("dotenv");
const path = require("path");
const app = require("./app");
const { connect } = require("./db");

//load env config file
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const PORT = process.env.PORT || 4040;

exports.startServer = async () => {
  await connect(process.env.MONGO_URI);

  app.listen(PORT, () => {
    console.log("this API is running on http://localhost:" + PORT);
  });
};
startServer();
