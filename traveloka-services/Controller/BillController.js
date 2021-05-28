import { DataMutation, DataQuerries, DataQuerry, DataParser } from "../Util"
import { AddBill, GetBillById, GetListBill, UpdateBillStatus } from "../Operation/Bill"; 
import QuerryBuilder from "../Config/Database";
import uuid from "uuid";

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
}
module.exports = BillController;