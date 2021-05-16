const database = require("../Config/Database");
const uuid = require("uuid");
const querryState = require("../Operation/Manufactor");
const { DataQuerry, DataMutation, DataQuerries } = require("../Util");
class ManufactorController {
    static async AddManufactorController(req, res, next) {
        try {
            const { name, code } = req.body;
            const insertData = {
                id: uuid.v4(),
                name: name || "No name",
                code: code || "No code",
                created_at: new Date
            }
            DataMutation(querryState.AddManufactor(insertData), res, 'Aadd Success')
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code:1000,
                    message:"Add manufactor failed"
                },
                result: null
            })
        }
    }
    static async GetManufactorController(req, res, next) {
        try {
            DataQuerries(querryState.GetManufactor(), res)
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code:1000,
                    message:"Get manufactor failed"
                },
                result: null
            })
        }
    }
}
module.exports = ManufactorController;