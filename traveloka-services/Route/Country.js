const CountryController = require("../Controller/CountryController");
const route = require("express").Router();

route.post("/",CountryController.AddCountryController)
route.get("/",CountryController.GetCountryController);


module.exports = route;