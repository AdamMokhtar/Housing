const express = require("express");
const router = express.Router();
const houseController = require("../controller/houseController");

/**
 * @description get all houses
 * @method get
 */
router.get("/", houseController.getAllHouses);
/**
 * @description post a new house
 * @method post
 */
router.post("/", houseController.postHouse);

/**
 * @description add a resident to the house by id
 * @method patch
 */
router.patch(
  "/addResident/:id",
  houseController.getHouse,
  houseController.addResident
);

/**
 * @description removes resident form a house
 *
 * @method patch
 */
router.patch(
  "/removeResident/:id",
  houseController.getHouse,
  houseController.removeResident
);
/**
 * @description delete a house
 * @method delete
 */
//FIXME: when id is empty it keeps looping
router.delete("/:id", houseController.deleteHouse);
module.exports = router;
