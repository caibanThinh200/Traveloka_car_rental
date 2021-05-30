const { DataMutation, DataQuerries, DataQuerry, DataParser } = require("../Util")
const { AddBill, GetBillById, GetListBill, UpdateBillStatus } = require("../Operation/Bill"); 
const QuerryBuilder = require("../Config/Database");
const uuid = require("uuid");
const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

class BillController {
    static async AddBillController(req,res,next) {
        try {
            const { idUser, total, rentalTime, listCar, idSaler } = req.body;
            switch(false) {
                case idSaler:
                    res.json("Invalid idSaler");
                case idUser:
                    res.json("Invalid idUser");
                case total > 0 || total:
                    res.json("Không có tổng tiền trong đơn hàng");
                case rentalTime || rentalTime > 0:
                    res.json("Không có thời gian thuê xe");
                case listCar:
                    res.json("Không có xe trong đơn hàng");
                default: {
                    const billInsert = {
                        id: uuid.v4(),
                        idSaler: idSaler || "",
                        idUser : idUser || "",
                        total : total || 0,
                        rentalTime : rentalTime || 0,
                        listCar : listCar || "",
                        status: "Waiting",
                        created_at : new Date
                    };
                    DataMutation(AddBill(billInsert), res, "Thêm hóa đơn thành công");
                }
            }
        } catch(e) {
            console.log(e);
            res.json({
                status:"FAILED",
                error: {
                    code: 1000,
                    message: "Thêm hóa đơn thất bại"
                },
                result: null
            })
        }
    }

    static async StartTimeHiringController(req,res,next) {
        try {
            const { idBill } = req.params
            const {isTriggered } = req.body;
            if (isTriggered) {
               DataMutation(UpdateBillStatus( idBill, "Car delivered" ), "Cập nhật hóa đơn thành công");
            }
        } catch(e) {
            console.log(e);
            res.json({
                status:"FAILED",
                error: {
                    code: 1000,
                    message: "Cập nhật hóa đơn thất bại"
                },
                result: null
            })
        }
    }
    
    static async GetListBillController(req,res,next) {
        try{
            DataQuerries(GetListBill);
        } catch(e) {
            console.log(e);
            res.json({
                status:"FAILED",
                error: {
                    code: 1000,
                    message: "Lấy ds hóa đơn thất bại"
                },
                result: null
            })
        }
    }
    static async StripePaymentController (req,res,next) {
        try{
            stripe.customers
            .create({
              email: 'customer@example.com',
            })
            .then((customer) => {
              // have access to the customer object
              return stripe.invoiceItems
                .create({
                  customer: customer.id, // set the customer id
                  amount: 2500, // 25
                  currency: 'usd',
                  source:"tok_amex",
                  description: 'One-time setup fee',
                })
                .then((invoiceItem) => {
                    console.log(invoiceItem);
                    return stripe.invoices.create({
                    collection_method: 'send_invoice',
                    customer: invoiceItem.customer,
                  });
                })
                .then((invoice) => {
                  // New invoice created on a new customer
                })
                .catch((err) => {
                  // Deal with an error
                });
            });
        } catch(e) {
            console.log(e);
        }
    }
}
module.exports = BillController;