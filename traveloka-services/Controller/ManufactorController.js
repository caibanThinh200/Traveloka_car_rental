const database = require("../Config/Database");
const uuid = require("uuid");
const querryState = require("../Operation/Manufactor");

class ManufactorController {
    static async AddManufactorController(req, res, next) {
        try {
            const { name, code } = req.body;
            console.log(name, code)
            const insertData = {
                id: uuid.v4(),
                name: name || "No name",
                code: code || "No code",
                created_at: new Date
            }
            database().then(async pool => {
                await pool.request()
                    .query(querryState.AddManufactor(insertData))
                res.json({
                    status: "SUCCESS",
                    error: null,
                    result: "Add manufactor success"
                })
            })
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
            database().then(async pool => {
                const manufactors = await pool.request()
                    .query(querryState.GetManufactor());
                res.json({
                    status: "SUCCESS",
                    error: null,
                    manufactors:manufactors.recordset
                })
            })
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