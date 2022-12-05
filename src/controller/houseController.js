const houseService = require("../service/houseService");
const EmptyContent = require("../exceptions/emptyContent");
const MissingID = require("../exceptions/missingID");
const UnsatisfiedCondition = require("../exceptions/unsatisfiedCondition");
const MissingObject = require("../exceptions/missingObject")

/**
 * @description return all houses
 */
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await houseService.getAllHouses();
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description post a house
 */
exports.postHouse = async (req, res) => {
  try {
    const house = await houseService.create(req.body);
    res.status(201).json(house);
  } catch (err) {
    if (err instanceof EmptyContent) {
      res.status(400).json({ message: err.message });
    }
    else if (err instanceof MissingID) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

/**
 * @description add resident to the house
 * this function will get the object house after calling getHouse from route
 */
exports.addResident = async (req, res) => {
  try{
    const house = await houseService.addResidentToHouse(req.body,res.house)
    res.status(200).json(house)
  }catch(err){
    if (err instanceof MissingID) {
      res.status(400).json({ message: err.message });
    }
    else if (err instanceof UnsatisfiedCondition) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

/**
 * @description delete house by id
 */
exports.deleteHouse = async (req, res) => {
  try{
    const deletedHouse = await houseService.deleteHouse(req.params)
    res.status(200).json({message: "House: " + deletedHouse + " is deleted!"})
  }catch(err){
    if (err instanceof MissingID) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};
/**
 * @description remove resident from house by id
 * this function will get the object house after calling getHouse from route
 */
exports.removeResident = async (req, res) => {

try{
  const updatedHouse = await houseService.removeResidentFromHouse(req.body,res.house)
  res.status(200).json(updatedHouse)
}catch(err){
  if (err instanceof MissingID) {
    res.status(400).json({ message: err.message });
  }
 else {
    res.status(500).json({ message: err.message });
  }
}
};

exports.getHouse = async (req, res, next) => {
  let house;
  try {
    house = await houseService.getHouse(req.params)
    res.house = house;
  } 
  catch (err) {
    if (err instanceof MissingID) {
      res.status(404).json({ message: err.message });
    }    
    else if (err instanceof MissingObject) {
      res.status(405).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
  next();
};
