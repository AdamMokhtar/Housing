var HouseDB = require("../model/house");
var ResidentDB = require("../model/resident");
const EmptyContent = require("../exceptions/emptyContent");
const MissingID = require("../exceptions/missingID");
const UnsatisfiedCondition = require("../exceptions/unsatisfiedCondition");
const MissingObject = require("../exceptions/missingObject")


exports.getAllHouses = async () => {
  try {
    return await HouseDB.find();
  } catch (err) {
    return err;
  }
};

exports.create = async (object) => {
  // validate request
  if (!object.address || !object.roomsCounter) {
    throw new EmptyContent("Both address and roomsCounter needs to be passed!"); //400
  }
  if (!object.ownerId) {
    throw new MissingID("ownerId should be in the content!"); //404
  }
  //get the owner by Id
  const ownerId = object.ownerId;

  try {
    ownerDb = await ResidentDB.findById(ownerId);
    // new house
    const house = new HouseDB({
      address: object.address,
      roomsCounter: object.roomsCounter,
      owner: ownerDb,
      residents: [],
    });
    return await house.save(); //201
  } catch (err) {
    return err; //500
  }
};

exports.addResidentToHouse = async (object,house) => {
  // validate request
  if (!object.residentId) {
    throw new MissingID("resident id should be in the content!"); //400
  }
  const residentId = object.residentId;

  // check if there's a spot available
  if (!checkAvailabilityToAddResident(house)) {
    throw new UnsatisfiedCondition("There is no room available!"); //404
  }
  try {
    const resident = await ResidentDB.findById(residentId);
    house.residents.push(resident);
    return await house.save(house); 
  } catch (err) {
    return err; //500
  }
};

exports.getHouse = async (object) => {
  if (!object.id) {
    throw new missingID("House id is missing!"); //404
  }
  let house;
  try {
    house = await HouseDB.findById(object.id);
    if (house == null) {
      throw new missingObject("cannot find house"); //405
    }
    return house;
  } catch (err) {
    return error; //500
  }
};

exports.deleteHouse = async (object) =>{
    // validate request
  if (!object.id) {
    throw new missingID("Resident id is needed!") //400
  }
  const _id = object.id;
  //TODO:: check if the house is in the database!
  try {
    return await HouseDB.findByIdAndDelete(_id); //200 
  } catch (err) {
    return err; //500
  }
}

exports.removeResidentFromHouse = async (object,house) =>{
      // validate request
  if (!object.residentId) {
     throw new missingID("resident id is needed!" ); //400
  }
  const residentId = object.residentId;
  try {
    const residentIndex = house.residents.findIndex((obj) => {
      return obj._id == residentId;
    });

    house.residents.splice(residentIndex, 1);
    return await house.save(house); //200

  } catch (err) {
    return err; //500
  }
}

exports.checkAvailabilityToAddResident = (house) => {
  const resCounter = house.residents.length;
  const roomCounter = house.roomsCounter;
  return roomCounter > resCounter ? true : false;
};
