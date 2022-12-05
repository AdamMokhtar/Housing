var ResidentDB = require("../model/resident");
const EmptyContent = require("../exceptions/emptyContent");
const MissingID = require("../exceptions/missingID");

exports.getAll = async () =>{
    try {
        return await ResidentDB.find();
      } catch (err) {
        return err;
      }
}

exports.create = async (object) => {
  // validate request
  if (!object.name || object.name.length === 0) {
    throw new EmptyContent("some Content cannot be empty!");
  }
  //creating the new resident
  const resident = new ResidentDB({
    name: object.name,
    phone: object.phone,
    age: object.age,
  });

  try {
    return await resident.save();
  } catch (err) {
    return err;
  }
};

exports.delete = async (object) =>{
    // validate request
  if (!object.id) {
    throw new MissingID("Resident id is needed!");
  }
  const _id = object.id;
  //TODO: remove the resident from all houses!
  try {
    return await ResidentDB.findByIdAndDelete(_id);
  } catch (err) {
    return err;
  }
}
