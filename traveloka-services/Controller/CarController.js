const database = require("../Config/Database");
const querryState = require("../Operation/Car");
const uuid = require("uuid");

class CarController {
    static async AddCarController(req, res, next) {
        try {
            const { idSaler, quantity, Seat, idManufactor, typeCar, self_drive_price, driver_price, insurance, name } = req.body;
            const filename = req.file.filename ? req.file.filename : '';
            const insertCar = {
                id: uuid.v4(),
                idSaler,
                name,
                quantity,
                Seat,
                idManufactor,
                typeCar,
                self_drive_price,
                driver_price,
                insurance,
                avatar: filename,
                created_at: new Date
            }
            database().then(async pool => {
                await pool.request()
                    .query(querryState.addCar(insertCar))
                res.json({
                    status: "SUCCESS",
                    error: null,
                    result: "Add car success"
                })

            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                data: null,
                error: {
                    code: 1000,
                    message: "Add car failed"
                }
            })
        }
    }
    static async GetListCarController(req, res, next) {
        try {
            database().then(async pool => {
                const cars = await pool.request()
                    .query(querryState.getCars())
                res.json({
                    status: "SUCCESS",
                    error: null,
                    cars: cars.recordset
                })
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: 'FAILED',
                error: {
                    code: 1000,
                    message: "Get list cars failed"
                }
            });
        }
    }
    static async GetCarByIdController(req, res, next) {
        try {
            const { id } = req.params;
            database().then(async pool => {
                const car = await pool.request()
                    .query(querryState.getCarById(id));
                res.json({
                    status: "SUCCESS",
                    error: null,
                    car: car.recordset
                })
            })
        } catch (e) {
            console.log(e);
        }
    }
    static async UpdateCarByIdController(req, res, next) {
        try {
            const { id } = req.params;
            const infoUpdate = req.body;
            const filename = !req.file.filename ? '' : req.file.filename;
            database().then(async pool => {
                const car = await pool.request().query(querryState.getCarById(id));
                const { name, quantity, Seat, idManufactor, self_drive_price, driver_price, insurance, typeCar } = car.recordset;
                const update = {
                    name: infoUpdate.name || name,
                    quantity: infoUpdate.quantity || quantity,
                    Seat: infoUpdate.Seat || Seat,
                    idManufactor: infoUpdate.idManufactor || idManufactor,
                    typeCar: infoUpdate.typeCar || typeCar,
                    self_drive_price: infoUpdate.self_drive_price || self_drive_price,
                    driver_price: infoUpdate.driver_price || driver_price,
                    insurance: infoUpdate.insurance || insurance,
                    avatar: filename,
                    updated_at: new Date
                }
                await pool.request()
                    .query(querryState.updateCarById(id, update));
                res.json({
                    status: "SUCCESS",
                    error: null,
                    message: "Update success!"
                })
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: 'FAILED',
                error: {
                    code: 1000,
                    message: "Update failed"
                }
            });
        }
    }
    static async GetListCarByManufactorController(req, res, next) {
        try {
            const { idManufactor } = req.body;
            database().then(async pool => {
                const car = await pool.request()
                    .query(querryState.getCarByIdManufactor(idManufactor));
                res.json({
                    status: "SUCCESS",
                    error: null,
                    car: car.recordset,
                })
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: 'FAILED',
                error: {
                    code: 1000,
                    message: "Get list car failed"
                }
            })
        }
    }
}
module.exports = CarController;