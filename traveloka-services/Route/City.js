const CityController = require("../Controller/CityController");
const route = require("express").Router();

route.post("/",CityController.AddCityController)
route.get("/",CityController.GetCityController);


module.exports = route;