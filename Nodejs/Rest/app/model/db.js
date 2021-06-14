const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

//console.log(dbConfig.HOST)
//console.log(dbConfig.USER)
//console.log(dbConfig.DB)


// open the MySQL connection
connection.connect((err) => {
    if (!err)
        console.log("DB connection is succeeded");
    else
        console.log("DB connection is Failed \n Error : " + JSON.stringify(err, undefined, 2));
});


module.exports = connection;