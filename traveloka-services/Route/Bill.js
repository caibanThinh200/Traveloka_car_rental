const route = require("express").Router();
const BillController = require("../Controller/BillController");

route.post("/payment",BillController.StripePaymentController);
route.post("/",BillController.AddBillController)
module.exports = route;