var HouseDB = require("../model/house");
var ResidentDB = require("../model/resident");

/**
 * @description return all houses
 */
exports.getAllHouses = async (req, res) => {
  try {
    console.log(HouseDB);
    const houses = await HouseDB.find();
    console.log(houses);
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
    res.status(400).send({ message: "ownerId should be in the content!" });
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
    res.status(400).json({ message: err.message });
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
    res.status(400).send({ message: "There is no room available!" });
    return;
  }

  try {
    const resident = await ResidentDB.findById(residentId);
    house.residents.push(resident);
    const newHouse = await house.save(house);
    res.status(201).json(newHouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

async function getHouse(req) {
  let house;
  try {
    house = await HouseDB.findById(req.params.id);
    if (house == null) {
      return res.status(404).json({ message: "cannot find house" });
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
