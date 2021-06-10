const route = require("express").Router();
const BillController = require("../Controller/BillController");

route.post("/payment",BillController.StripePaymentController);
route.post("/",BillController.AddBillController);
route.put("/:id", BillController.StartTimeHiringController);
route.get("/customer/:id", BillController.GetBillByIdUser);
route.get("/saler/:id", BillController.GetBillByIdSaler);
route.get("/endDate/:idBill", BillController.EndTimeHiringController)

module.exports = route;