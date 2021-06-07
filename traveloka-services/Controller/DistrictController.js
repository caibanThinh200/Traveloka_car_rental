const uuid = require("uuid");
const database = require("../Config/Database");
const {DataMutation, DataQuerries, DataParser} = require("../Util")
const querryState = require("../Operation/District");

class DistrictController {
    static async AddDistrictController(req, res, next) {
        try {
            const { name, code , idCity} = req.body;
            const insertDistrict = {
                id : uuid.v4(),
                name : name || "",
                code: code || "",
                idCity: idCity || ""
            };
            DataMutation(querryState.AddDistrict(insertDistrict),res,"Add district success");
        } catch (e) {
            console.log(e);
            res.json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Add district failed"
                },
                result: null
            })
        }
    }
    static async GetDistrictController(req, res, next) {
        try {
            DataQuerries(querryState.GetDistrict(),res);
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code:1000,
                    message:"Get district failed"
                },
                result: null
            })
        }
    }

    static async GetAvailableDistrictByIdCar(req,res,next) {
        try {
            const { id } = req.params;
            database.query(querryState.GetDistrictsByIdCar(id),(err, result)=> {
                const ids = DataParser(result);
                const idDistricts = ids.map(idDistrict =>  idDistrict.idDistrict);
                DataQuerries(querryState.GetDistrictById(idDistricts), res);
            })
        } catch(e) {
            console.log(e);
        } 
    }
}
module.exports = DistrictController