require("dotenv").config();
const mssql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.HOST,
    database: process.env.DB_NAME,
    options: {
        instanceName: "SQLEXPRESS",
        encrypt: false,
    },
}
async function connect() {
    try {
        const pool = await mssql.connect(config);
        console.log("DB connected")
        return pool
    } catch (e) {
        console.log(e)
    }
}

module.exports = connect;