require("dotenv").config();
const mssql = require("mssql");


async function connect() {
    console.log(process.env)
    try {
        const config = {
            user: process.env.MSSQL_USER,
            password: process.env.SA_PASSWORD,
            server: "localhost",
            database: process.env.MSSQL_DB,
            port: process.env.PORT_DB,
            options: {
                port: process.env.PORT_DB
            }
        }
        const pool = await mssql.connect(config, (err) => {
            console.log("err: ", err)
        }); 
        console.log("DB connected")
        return pool
    } catch (e) {
        console.log(e)
    }
}

module.exports = connect;