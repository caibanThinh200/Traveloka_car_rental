const db = require("../Config/Database");
const querryStatement = require("../Operation/Car");

const CarTable = () => 
db().then(async pool => {
    await pool.request().query(querryStatement.carSchema);
})

module.exports = CarTable;