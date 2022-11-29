const express = require("express");
const router = express.Router();
const residentController = require("../controller/residentController");

/**
 * @description return all residents
 * @method get
 */
router.get("/", residentController.getAllResidents);
/**
 * @description post a resident
 * @method post
 */
router.post("/", residentController.createResident);
/**
 * @description delete a resident
 *  @method delete
 */
router.delete("/:id", residentController.deleteResident);

module.exports = router;
