const { DataMutation, DataQuerries, DataQuerry, DataParser } = require("../Util")
const { AddBill, GetBillById, GetListBill, UpdateBillStatus, GetBillByIdUser, GetBillByIdSaler, AddNewKPI, GetMonthKPIByYear } = require("../Operation/Bill"); 
const QuerryBuilder = require("../Config/Database");
const uuid = require("uuid");
const Stripe = require("stripe");
const moment = require("moment")
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

class BillController {
    static async AddBillController(req,res,next) {
        try {
            const { idUser, total, startDate,endDate, listCar, idSaler, userAddress, phone, email } = req.body;
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
                        address: userAddress || "",
                        phone: phone || 0,
                        gmail: email || "",
                        idCar : listCar || "",
                        status: "Waiting",
                        created_at : new Date
                    };
                    DataMutation(AddBill(billInsert), res, {id: billInsert.id , address: userAddress});
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
            const { payment } = req.body;
               DataMutation(UpdateBillStatus( id, "In progress", payment), res, "Cập nhật hóa đơn thành công");
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
            const endDay = moment(endDate).format()
            const currentTime = moment(new Date()).format();
            if (currentTime > endDay) {
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
        try {
            const { amount, id, car } = req.body;
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description: car,
                payment_method: id,
                confirm: true
            })
            res.json({
                status:"SUCCESS",
                message: "Payment successful",
                payment,
                success: true
            })
        } catch (error) {
            console.log("Error", error)
            res.json({
                status: "FAILED",
                message: "Payment failed",
                success: false
            })
        }
    }

    static async AddNewMonthKPIController(req, res, next) {
        try {
            const { total, result, month, year, partnerId } = req.body;
            const insertKPI = {
                id: uuid.v4() || "",
                idSaler: partnerId || "",
                month: new Date(month).getMonth() || new Date().getMonth(),
                year: year || new Date().getFullYear(),
                target: 10000000 || 0,
                total: total || 0,
                result : result || 0
            }
            DataMutation(AddNewKPI(insertKPI), res, "Add KPI success")
        } catch(e) {
            console.log(e);
            res.json({
                status: "FAILED",
                message: "Add KPI failed",
                success: false
            })
        }
    }

    static async GetAllMonthKPIOfYearController(req, res, next) {
        try {
            const { year } = req.query;
            const { id } = req.params
            DataQuerries(GetMonthKPIByYear(year,id), res)
        } catch(e) {
            console.log(e);
            res.json({
                status: "FAILED",
                message: "Get KPI failed",
                success: false
            })
        }
    }
}
module.exports = BillController;