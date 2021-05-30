const route = require("express").Router();
const BillController = require("../Controller/BillController");

route.post("/payment",BillController.StripePaymentController);

module.exports = route;