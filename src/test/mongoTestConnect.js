const { connect, disconnect } = require("../server/db");
const path = require("path");
const dotenv = require("dotenv");

//load env config file
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

exports.connectToDB = async () => {
  connect(process.env.MONGO_URI);
};

exports.disconnectToDB = async () => {
  disconnect();
};
