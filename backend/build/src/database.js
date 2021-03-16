"use strict";
require("dotenv/config");
var sqlite3DBConn = require('sqlite3').verbose();
var DB_NAME = process.env.SOURCE_DATABASE; // Defining database name
var dbConn = new sqlite3DBConn.Database(DB_NAME, function (error) {
    if (error) {
        console.error(error.message);
        throw error;
    }
    else {
        console.log('Connected to the SQLIT3 database.');
    }
});
module.exports = dbConn;
