var HouseDB = require("../model/house");
var ResidentDB = require("../model/resident");

/**
 * @description return all houses
 */
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await HouseDB.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description post a house
 */
exports.postHouse = async (req, res) => {
  // validate request
  if (!req.body.address || !req.body.roomsCounter) {
    res
      .status(400)
      .send({ message: "Both address and roomsCounter needs to be passed!" });
    return;
  }
  if (!req.body.ownerId) {
    res.status(404).send({ message: "ownerId should be in the content!" });
    return;
  }

  //get the owner by Id
  const ownerId = req.body.ownerId;
  try {
    ownerDb = await ResidentDB.findById(ownerId);
    // new house
    const house = new HouseDB({
      address: req.body.address,
      roomsCounter: req.body.roomsCounter,
      owner: ownerDb,
      residents: [],
    });
    const newHouse = await house.save();
    res.status(201).json(newHouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description add resident to the house
 */
exports.addResident = async (req, res) => {
  // validate request
  if (!req.body.residentId) {
    res.status(400).send({ message: "resident id is needed!" });
    return;
  }

  const residentId = req.body.residentId;

  // check if there's a spot available
  if (!checkAvailabilityToAddResident(res.house)) {
    res.status(404).send({ message: "There is no room available!" });
    return;
  }

  try {
    const resident = await ResidentDB.findById(residentId);
    res.house.residents.push(resident);
    const newHouse = await res.house.save(res.house);
    res.status(200).json(newHouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description delete house by id
 */
exports.deleteHouse = async (req, res) => {
  // validate request
  if (!req.params.id) {
    res.status(400).send({ message: "Resident id is needed!" });
  }
  const _id = req.params.id;
  try {
    await HouseDB.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "House with the id " + _id + " is deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * @description remove resident from house by id
 */
exports.removeResident = async (req, res) => {
  // validate request
  if (!req.body.residentId) {
    res.status(400).send({ message: "resident id is needed!" });
    return;
  }
  const residentId = req.body.residentId;
  try {
    const residentIndex = res.house.residents.findIndex((obj) => {
      return obj._id == residentId;
    });
    res.house.residents.splice(residentIndex, 1);
    const updatedHouse = await res.house.save(res.house);
    res.status(200).json(updatedHouse);
    //save
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHouse = async (req, res, next) => {
  let house;
  try {
    house = await HouseDB.findById(req.params.id);
    if (house == null) {
      return res.status(405).json({ message: "cannot find house" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.house = house;
  next();
};

exports.checkAvailabilityToAddResident = (house) => {
  const resCounter = house.residents.length;
  const roomCounter = house.roomsCounter;
  return roomCounter > resCounter ? true : false;
};
