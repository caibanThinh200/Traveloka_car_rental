const DistrictController = require("../Controller/DistrictController");
const route = require("express").Router();

route.post("/",DistrictController.AddDistrictController)
route.get("/",DistrictController.GetDistrictController);


module.exports = route;