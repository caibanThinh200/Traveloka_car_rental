require("dotenv").config();
const mysql = require("mysql");
const config = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

config.connect(err => {
  if (err){
    console.log(err);
  }
  else{
    console.log("DB connected");
  }
})

module.exports = config;
