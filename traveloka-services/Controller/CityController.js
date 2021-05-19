const uuid = require("uuid");
const {DataMutation, DataQuerries} = require("../Util")
const querryState = require("../Operation/City");
class CityController {
    static async AddCityController(req, res, next) {
        try {
            const { name, code,idCountry } = req.body;
            const insertCity = {
                id : uuid.v4(),
                name : name || "",
                code: code || "",
                idCountry: idCountry || ""
            };
            DataMutation(querryState.AddCity(insertCity),res,"Add city success");
        } catch (e) {
            console.log(e);
            res.json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Add city failed"
                },
                result: null
            })
        }
    }
    static async GetCityController(req, res, next) {
        try {
            DataQuerries(querryState.GetCity(),res);
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code:1000,
                    message:"Get city failed"
                },
                result: null
            })
        }
    }
}
module.exports = CityController