const config = require("./Config/Database")

const DataParser = data => JSON.parse(JSON.stringify(data))
const DataMutation = (querry, response, message) => {
    config.query(querry, (err, resPacket) => {
        const res = DataParser(resPacket);
        if (res.affectedRows) {
            response.json({
                status: "SUCCESS",
                error: null,
                result: message
            })
        }
    }) 
}

const DataQuerries = (querry, response, message) => {
    config.query(querry, (err, resPacket) => {
        const res = DataParser(resPacket);
        if (res) {
            response.json({
                status: "SUCCESS",
                error: null,
                result: res
            })
        }
    })
}

const DataQuerry = (querry, response, message) => {
    config.query(querry, (err, resPacket) => {
        const res = DataParser(resPacket);
        if (res) {
            response.json({
                status: "SUCCESS",
                error: null,
                result: res[0]
            })
        }
    })
}
module.exports = {
    DataQuerries,
    DataMutation,
    DataQuerry,
    DataParser
}