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
router.patch("/addResident/:id", houseController.addResident);

module.exports = router;
