const { DataMutation, DataQuerries, DataQuerry, DataParser } = require("../Util")
const { AddBill, GetBillById, GetListBill, UpdateBillStatus, GetBillByIdUser, GetBillByIdSaler } = require("../Operation/Bill"); 
const QuerryBuilder = require("../Config/Database");
const uuid = require("uuid");
const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

class BillController {
    static async AddBillController(req,res,next) {
        try {
            const { idUser, total, startDate,endDate, listCar, idSaler, address } = req.body;
            switch(false) {
                case idSaler:
                    res.json("Invalid idSaler");
                case idUser:
                    res.json("Invalid idUser");
                case total > 0 || total:
                    res.json("Không có tổng tiền trong đơn hàng");
                case new Date(startDate) && new Date(startDate).getDate() > 0:
                    res.json("Không có thời gian thuê xe");
                case new Date(endDate) && new Date(endDate).getDate() > 0:
                        res.json("Không có thời gian thuê xe");
                case listCar:
                    res.json("Không có xe trong đơn hàng");
                default: {
                    const billInsert = {
                        id: uuid.v4(),
                        idSaler: idSaler || "",
                        idUser : idUser || "",
                        total : total || 0,
                        startDate: new Date(startDate) || "",
                        endDate: new Date(endDate) || "",
                        address: address || "",
                        idCar : listCar || "",
                        status: "Waiting",
                        created_at : new Date
                    };
                    DataMutation(AddBill(billInsert), res, {id: billInsert.id , address: address});
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

    static async GetBillById(req, res, next) {
        try {
            const { id } = req.params;
            DataQuerry(GetBillById(id), res);
        } catch(e) {
            console.log(e);
        }
    }

    static async GetBillByIdUser(req,res,next) {
        try {
            const { id } = req.params;
            DataQuerries(GetBillByIdUser(id), res);
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

    static async GetBillByIdSaler(req,res,next) {
        try {
            const { id } = req.params;
            DataQuerries(GetBillByIdSaler(id), res);
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

    static async StartTimeHiringController(req,res,next) {
        try {
            const { id } = req.params
               DataMutation(UpdateBillStatus( id, "In progress" ), res, "Cập nhật hóa đơn thành công");
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
    static async EndTimeHiringController(req,res,next) {
        try{
            const { idBill } = req.params;
            const { endDate } = req.query;
            const endDay = new Date(endDate)
            const currentTime = new Date;
            console.log(currentTime.getDate() >= endDay.getDate() && currentTime.getMinutes() >= endDay.getMinutes() &&currentTime.getSeconds() >= endDay.getSeconds())
                if (currentTime.getDate() >= endDay.getDate() && currentTime.getMinutes() >= endDay.getMinutes() && currentTime.getSeconds() >= endDay.getSeconds()) {
                    DataMutation(UpdateBillStatus( idBill, "DONE" ), res, "Cập nhật hóa đơn thành công");
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
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                  {
                    price_data: {
                      currency: 'usd',
                      product_data: {
                        name: 'Stubborn Attachments',
                        images: ['https://i.imgur.com/EHyR2nP.png'],
                      },
                      unit_amount: 2000,
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: `localhost:3301/bill/payment`,
                cancel_url:  `localhost:3301/bill/payment`,
              });
              res.json({ id: session.id });
        } catch(e) {
            console.log(e);
        }
    }
}
module.exports = BillController;