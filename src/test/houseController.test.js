const app = require("../server/app");
const request = require("supertest");
const houseDB = require("../model/house");
const dbConnection = require("./mongoTestConnect");
var housePath = "/house";

beforeAll(async () => {
  await dbConnection.connectToDB();
});

afterAll(async () => {
  await dbConnection.disconnectToDB();
});

const newHouse = {
  address: "Zwara",
  roomsCounter: 3,
  ownerId: "637e3fdf43232b79d5b12c54",
};

const newHouseNoOwner = {
  address: "Zwara",
  roomsCounter: 3,
};

describe("get all houses", () => {
  it("return status code 200 in case passed", async () => {
    const res = await request(app).get(housePath);
    expect(res.statusCode).toEqual(200);
  });
});

describe("post a new house", () => {
  it("returns status code 201 and the same user in case user created", async () => {
    await request(app)
      .post(housePath)
      .send(newHouse)
      .expect(201)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.address).toBe(newHouse.address);
        expect(response.body.roomsCounter).toEqual(newHouse.roomsCounter);
        expect(response.body.owner._id).toBe(newHouse.ownerId);
        //delete the posted house after testing
        await houseDB.findByIdAndDelete(response.body._id);
      });
  });
  it("returns status code 404 when ownerId is not passed", async () => {
    await request(app)
      .post(housePath)
      .send(newHouseNoOwner)
      .expect(404)
      .then(async (response) => {
        // Check the response
        expect(response.body.message).toBe("ownerId should be in the content!");
      });
  });

  it("returns status code 400 when body has no roomCounter and address", async () => {
    await request(app)
      .post(housePath)
      .send()
      .expect(400)
      .then(async (response) => {
        // Check the response
        expect(response.body.message).toBe(
          "Both address and roomsCounter needs to be passed!"
        );
      });
  });
});
