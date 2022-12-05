const residentService = require("../service/residentService")
const EmptyContent = require("../exceptions/emptyContent")
const MissingID = require("../exceptions/missingID");

exports.getAllResidents = async (req, res) => {
  try {
    const allResidents = await residentService.getAll()
    res.status(200).json(allResidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResident = async (req, res) => {
try{
  const newResident = await residentService.create(req.body)
  res.status(201).json(newResident);
}catch(err){
  if(err instanceof EmptyContent){
    res.status(400).json({ message: err.message});
  }
  else{
    res.status(500).json({ message: err.message });
  }
    
}

};

exports.deleteResident = async (req, res) => {
  try{
    const deletedResident = await residentService.delete(req.params)
    res.status(200).json({ message: "Resident " + deletedResident + " is deleted!" });
  }catch(err){
    if(err instanceof MissingID){
      res.status(400).json({ message: err.message});
    }
    else{
      res.status(500).json({ message: err.message });
    }
}
}
