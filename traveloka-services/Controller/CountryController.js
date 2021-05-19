const uuid = require("uuid");
const {DataMutation,DataQuerries} = require("../Util")
const {AddCountry} = require("../Operation/Country");
const querryState = require("../Operation/Country")
class CountryController {
    static async AddCountryController(req, res, next) {
        try {
            const { name, code } = req.body;
            const insertCountry = {
                id : uuid.v4(),
                name : name || "",
                code: code || ""
            };
            DataMutation(AddCountry(insertCountry),res,"Add country success");
        } catch (e) {
            console.log(e);
            res.json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Add country failed"
                },
                result: null
            })
        }
    }
    static async GetCountryController(req, res, next) {
        try {
            DataQuerries(querryState.GetCountry(),res);
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code:1000,
                    message:"Get country failed"
                },
                result: null
            })
        }
    }
}
module.exports = CountryController