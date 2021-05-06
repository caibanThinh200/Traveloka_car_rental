const route = require("express").Router();
const ManufactorController = require("../Controller/ManufactorController");

route.post("/",ManufactorController.AddManufactorController);
route.get("/",ManufactorController.GetManufactorController);

module.exports = route;