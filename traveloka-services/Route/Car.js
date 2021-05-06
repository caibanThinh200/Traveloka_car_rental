const route = require("express").Router();
const CarController = require("../Controller/CarController");
const upload = require("../multer");

route.post("/",upload.single("image"),CarController.AddCarController);
route.get("/",CarController.GetListCarController);
route.get("/detail/:id",CarController.GetListCarByIdController);

module.exports = route;