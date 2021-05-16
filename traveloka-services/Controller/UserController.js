const dataQuerry = require("../Config/Database");
const querryStatement = require("../Operation/User");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DataParser, DataQuerry, DataMutation, DataQuerries } = require("../Util");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class UserController {
    static async AddUserController(req, res, next) {
        try {

            const { fullname, phoneNum, role, company, gmail, password } = req.body;
            const insertUser = {
                id: uuid.v4(),
                fullname: fullname || "",
                phoneNum: phoneNum || "",
                role: role || "",
                company: role === "saler" ? company : '',
                gmail: gmail || "",
                password: bcrypt.hashSync(password, 10),
                // password: bcrypt.hashSync(password, 10),
                created_at: new Date
            };
            DataMutation(querryStatement.addUser(insertUser), res, 'Add user success')
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
            dataQuerry.query(querryStatement.getUserByGmail(gmail), (err, userRow) => {
                const user = DataParser(userRow);
                if (!user[0].gmail || !bcrypt.compareSync(password, user[0].password)) {
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
                    const token = jwt.sign({ id: user[0].id || "" }, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 });
                    res.json({
                        status: "SUCCESS",
                        error: null,
                        token
                    })
                }
            });

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
            DataQuerry(querryStatement.getUserById(id), res)
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
    static GetDetailByJWTController(req, res, next) {
        try {
            const token = req.header("Authorization").replace("Bearer ", "");
            const verifyToken = jwt.verify(token, JWT_SECRET_KEY) || "";
            DataQuerry(querryStatement.getUserById(verifyToken.id), res);
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
            DataQuerries(querryStatement.getUsers(),res);
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