const route = require("express").Router();
const UserController = require("../Controller/UserController");

route.post("/",UserController.AddUserController);
route.post("/login",UserController.LoginController);
route.get("/",UserController.GetUserController);
route.get("/detail/:id",UserController.GetDetailByIdController);
route.get("/token",UserController.GetDetailByJWTController);
module.exports = route;
