const route = require("express").Router();
const CarController = require("../Controller/CarController");

route.post("/",CarController.AddCarController);
route.get("/",CarController.GetListCarController);
route.get("/detail/:id",CarController.GetListCarByIdController);
route.put("/:id",CarController.UpdateCarByIdController);
route.get("/manufactor", CarController.GetListCarByManufactorController);
module.exports = route;                    