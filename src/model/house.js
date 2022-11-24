const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var houseSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },

  roomsCounter: {
    type: Number,
    required: true,
    min: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Resident",
  },

  residents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resident",
    },
  ],
});

const HouseDB = mongoose.model("House", houseSchema);
module.exports = HouseDB;
