const mongoose = require("mongoose");

var residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  age: {
    type: Number,
  },
});
const ResidentDB = mongoose.model("Resident", residentSchema);
module.exports = ResidentDB;
