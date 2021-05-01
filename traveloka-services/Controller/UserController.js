const query = require("../Config/Database");
const querryStatement = require("../Operation/User");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class UserController {
    static async AddUserController(req, res, next) {
        try {
            const { fullname, phoneNum, role, company, gmail, password } = req.body;
            const insertUser = {
                id: uuid.v4(),
                fullname,
                phoneNum,
                role,
                company: role === "saler" ? company : '',
                gmail,
                password: bcrypt.hashSync(password, 10),
                created_at: new Date
            };
            query().then(async pool => {
                await pool.request()
                    .query(querryStatement.addUser(insertUser))
                    .then(() =>
                        res.json({
                            status: "SUCCESS",
                            error: null,
                            result: "Add user success"
                        })
                    );
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code: 500,
                    message: "Register failed"
                },
                result: null
            })
        }
    }

    static async LoginController(req, res, next) {
        try {
            const { gmail, password } = req.body;
            query().then(async pool => {
                const user = await pool.request()
                    .query(querryStatement.getUserByGmail(gmail));
                if (!user.recordset[0].gmail || !bcrypt.compareSync(password, user.recordset[0].password)) {
                    res.json({
                        status: "FAILED",
                        error: {
                            code: 500,
                            message: "Invalid gmail or password"
                        },
                        result: null
                    })
                }
                else {
                    const token = jwt.sign({ id: user.recordset[0].id || ""}, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 });
                    res.json({
                        status: "SUCCESS",
                        error: null,
                        token
                    })
                }

            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code: 500,
                    message: "Something was wrong"
                },
                result: null
            })
        }
    }
    static async GetDetailByIdController(req, res, next) {
        try {
            const { id } = req.params;
            query().then(async pool => {
                const user = await pool.request()
                    .query(querryStatement.getUserById(id))
                res.json({
                    status: "SUCCESS",
                    error: null,
                    user: user.recordset[0]
                })
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code: 500,
                    message: "Get user failed"
                },
                result: null
            })
        }
    }
    static GetDetailByJWTController(req,res,next) {
        try {
            const token = req.header("Authorization").replace("Bearer ", "");
            const verifyToken = jwt.verify(token,JWT_SECRET_KEY) || "";
            query().then(async pool => {
                const user = await pool.request()
                    .query(querryStatement.getUserById(verifyToken.id))
                    res.json({
                        status: "SUCCESS",
                        error: null,
                        user: user.recordset[0]
                    })
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code: 500,
                    message: "Get user failed"
                },
                result: null
            })
        }
    }
    static async GetUserController(req, res, next) {
        try {
            query().then(async pool => {
                const data = await pool.request()
                    .query(querryStatement.getUsers());
                res.json({
                    status: "SUCCESS",
                    error: null,
                    data: data.recordset || []
                })
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                error: {
                    code: 500,
                    message: "Get users failed"
                },
                result: null
            })
        }
    }
}
module.exports = UserController