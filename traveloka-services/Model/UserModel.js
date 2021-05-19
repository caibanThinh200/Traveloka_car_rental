const db = require("../Config/Database");
const querryStatement = require("../Operation/User");

const UserTable = () => 
db().then(async pool => {
    await pool.request().query(querryStatement.carSchema);
})

module.exports = UserTable;