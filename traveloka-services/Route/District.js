const DistrictController = require("../Controller/DistrictController");
const route = require("express").Router();

route.post("/", DistrictController.AddDistrictController)
route.get("/", DistrictController.GetDistrictController);
route.get("/:id", DistrictController.GetAvailableDistrictByIdCar);


module.exports = route;