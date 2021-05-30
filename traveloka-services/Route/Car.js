const route = require("express").Router();
const CarController = require("../Controller/CarController");
const upload = require("../multer");

route.post("/", upload.single("image"), CarController.AddCarController);
route.get("/", CarController.GetListCarController);
route.get("/detail/:id", CarController.GetCarByIdController);
route.put("/:id", upload.single("image"), CarController.UpdateCarByIdController);
route.get("/manufactor", CarController.GetListCarByManufactorController);
route.post("/district",CarController.AddDistrictAvailable);
route.get("/availableCar",CarController.GetAvailableCarByDistrict);
route.get("/available/city",CarController.GetAvailableCarByCity);

module.exports = route;
