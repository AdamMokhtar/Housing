var ResidentDB = require("../model/resident");

exports.getAllResidents = async (req, res) => {
  try {
    const residents = await ResidentDB.find();
    res.status(200).json(residents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResident = async (req, res) => {
  //TODO:: check if the same name is already in the DB
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  //creating the new resident
  const resident = new ResidentDB({
    name: req.body.name,
    phone: req.body.phone,
    age: req.body.age,
  });
  try {
    const newResident = await resident.save();
    res.status(201).json(newResident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
