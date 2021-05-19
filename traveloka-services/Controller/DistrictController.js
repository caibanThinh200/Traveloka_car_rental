const uuid = require("uuid");
const {DataMutation, DataQuerries} = require("../Util")
const querryState = require("../Operation/District");

class DistrictController {
    static async AddDistrictController(req, res, next) {
        try {
            const { name, code } = req.body;
            const insertDistrict = {
                id : uuid.v4(),
                name : name || "",
                code: code || "",
                idcity: uuid.v4(),
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
}
module.exports = DistrictController