const route = require("express").Router();
const BillController = require("../Controller/BillController");

route.post("/payment", BillController.StripePaymentController);
route.post("/", BillController.AddBillController);
route.put("/progress/:id", BillController.InProgressController);
route.put("/:id", BillController.StartTimeHiringController);
route.get("/customer/:id", BillController.GetBillByIdUser);
route.get("/saler/:id", BillController.GetBillByIdSaler);
route.get("/endDate/:idBill", BillController.EndTimeHiringController);
route.post("/stripe", BillController.StripePaymentController);
route.post("/KPI", BillController.AddNewMonthKPIController);
route.get("/KPI/:id", BillController.GetAllMonthKPIOfYearController);
route.delete("/stripe/:id", BillController.stripeRefundController)
route.delete("/:id", BillController.DisableBillController);

module.exports = route;