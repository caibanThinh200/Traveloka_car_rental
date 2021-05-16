const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")

app.use(express.urlencoded({extended:false}))
app.use(express.raw());
app.use(express.json())
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("welcome to Traveloka BE server");
})


const UserRoute = require("./Route/User");
const CarRoute = require("./Route/Car");
const Manufactor = require("./Route/Manufactor");

app.use("/user", UserRoute);
app.use("/car", CarRoute);
app.use("/manu", Manufactor);

app.get("*", (req, res, next) => {
    res.status(404).send("API not found");
})
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3301;

server.listen(PORT, async (err) => {
    if (err) {
        console.log(err);
    }
    else{
        console.log("Server is running on port " + PORT )
    }
});

module.exports = app;