const database = require("../Config/Database");
const querryState = require("../Operation/Car");
const uuid = require("uuid");
const { DataQuerry, DataMutation, DataQuerries, DataParser } = require("../Util");

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
            DataMutation(querryState.addCar(insertCar), res, 'A-+dd success')
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
            DataQuerries(querryState.getCars(), res)
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
            DataQuerry(querryState.getCarById(id), res)
        } catch (e) {
            console.log(e);
        }
    }
    static async UpdateCarByIdController(req, res, next) {
        try {
            const { id } = req.params;
            const infor = req.body
            // const filename = !req.file.filename ? '' : req.file.filename;
            database.query(querryState.getCarById(id), (err, result) => {
                const { 
                    name, 
                    quantity, 
                    Seat, 
                    idManufactor, 
                    self_drive_price, 
                    driver_price, 
                    insurance, 
                    typeCar 
                    } = result[0];
                
                const updateInfor = {
                    name: infor.name || name,
                    quantity: infor.quantity || quantity,
                    Seat: infor.Seat || Seat,
                    idManufactor: infor.idManufactor || idManufactor,
                    self_drive_price: infor.self_drive_price || self_drive_price,
                    driver_price: infor.driver_price || driver_price,
                    insurance: infor.insurance || insurance,
                    typeCar: infor.typeCar || typeCar,
                }  
                DataMutation(querryState.updateCarById(id, updateInfor), res, 'Update Success')            
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
            DataQuerries(querryState.getCarByIdManufactor(idManufactor),res)
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
    static async AddDistrictAvailable(req,res,next){
        try{
            const { idDistrict,idCar } = req.body;
            DataMutation(querryState.addDistrictAvailable(idCar,idDistrict), res, "Add car success");
        }catch(e){
            console.log(e);
            res.json({
                status: 'FAILED',
                error: {
                    code: 1000,
                    message: "Add car failed"
                }
            })
        }
    }
    static async GetAvailableCarByDistrict(req,res,next){
        try{
            const { idDistrict } = req.query;
            database.query(querryState.getCarsByIdDistrict(idDistrict),(err,result) => {
                const availableCars = DataParser(result);
                let arr = [];
                availableCars.map(car => {
                    arr.push(car.idCar);
                })
                DataQuerries(querryState.getCarByIdCars(arr),res);
            })
            
        }catch(e){
            console.log(e);
            res.json({
                status: 'FAILED',
                error: {
                    code: 1000,
                    message: "Get list cars failed"
                }
            })
        }
    }
    static async GetAvailableCarByCity(req,res,next) { 
        try{
            const { idCity } = req.query;
            database.query((querryState.getDistrictsByIdCity(idCity)),(err , districts) => {
                let arrDistrictId = [];
                let arrCarId = [];
                const parseDistrict = DataParser(districts);
                parseDistrict.forEach(district => {
                    arrDistrictId.push(district.id);
                })
                database.query(querryState.getCarByIdsDistrict(arrDistrictId), (err ,result) => {
                    const parsedResult = DataParser(result);
                    parsedResult.forEach( car => {
                        arrCarId.push(car.idCar)
                    })
                    DataQuerries(querryState.getCarByIdCars(arrCarId), res);
                })
            });
        } catch(e) {
            console.log(e);
            res.json({
                status: 'FAILED',
                error: {
                    code: 1000,
                    message: "Get list cars failed"
                }
            })
        }
    }
    static async GetCarsBySalerController(req,res,next) {
        try {
            const { id } = req.query;
            DataQuerries(querryState.getCarsBySalerId(id), res);
        } catch(e) {
            console.log(e);
        }
    }

}
module.exports = CarController;