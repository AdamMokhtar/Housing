const houseController = require("../controller/houseController");
const house = require("../model/house");
const resident = require("../model/resident");

//creating a resident
const newRes = Object.create(resident);
newRes.name = "Test";

//creating a new house
const newHouse = Object.create(house);
newHouse.residents = [newRes];
describe("house Controller", () => {
  test("return true if house has an empty spot", () => {
    newHouse.roomsCounter = 3;
    const result = houseController.checkAvailabilityToAddResident(newHouse);
    expect(result).toEqual(true);
  });

  test("return false if house has no empty spot", () => {
    newHouse.roomsCounter = 1;
    const result = houseController.checkAvailabilityToAddResident(newHouse);
    expect(result).toEqual(false);
  });
});
