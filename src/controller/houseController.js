var HouseDB = require("../model/house");
var ResidentDB = require("../model/resident");

/**
 * @description return all houses
 */
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await HouseDB.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description post a house
 */
exports.postHouse = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
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
  let house = await getHouse(req);

  // check if there's a spot available
  if (!checkAvailabilityToAddResident(house)) {
    res.status(404).send({ message: "There is no room available!" });
    return;
  }

  try {
    const resident = await ResidentDB.findById(residentId);
    house.residents.push(resident);
    const newHouse = await house.save(house);
    res.status(200).json(newHouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description delete house by id
 */
exports.deleteHouse = async (req, res) => {
  const _id = req.params.id;
  try {
    const returned = await HouseDB.findByIdAndDelete(_id);
    res.status(200).json(returned);
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
  let house = await getHouse(req);
  try {
    const residentIndex = house.residents.findIndex((obj) => {
      return obj._id == residentId;
    });
    house.residents.splice(residentIndex, 1);
    const updatedHouse = await house.save(house);
    res.status(200).json(updatedHouse);
    //save
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getHouse(req) {
  let house;
  try {
    house = await HouseDB.findById(req.params.id);
    if (house == null) {
      return res.status(405).json({ message: "cannot find house" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return house;
}

function checkAvailabilityToAddResident(house) {
  const resCounter = house.residents.length;
  const roomCounter = house.roomsCounter;

  if (roomCounter > resCounter) {
    return true;
  }
  return false;
}
