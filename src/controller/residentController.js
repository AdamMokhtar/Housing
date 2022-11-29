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

exports.deleteResident = async (req, res) => {
  // validate request
  if (!req.params.id) {
    res.status(400).send({ message: "Resident id is needed!" });
  }
  const _id = req.params.id;
  //TODO: remove the resident from all houses!
  try {
    await ResidentDB.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "Resident with the id " + _id + " is deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
