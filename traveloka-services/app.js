const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.raw());
app.use(bodyParser.json())
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("welcome to Traveloka BE server");
})


const UserRoute = require("./Route/User");
const CarRoute = require("./Route/Car");

app.use("/user", UserRoute);
app.use("/car", CarRoute);

app.get("*", (req, res, next) => {
    res.status(404).send("API not found");
})
const server = require("http").createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else
        console.log("Server is running on port " + PORT);
});

module.exports = app;