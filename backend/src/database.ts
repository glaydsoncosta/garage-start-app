require("dotenv/config");
const sqlite3DBConn = require('sqlite3').verbose();
const DB_NAME =  process.env.SOURCE_DATABASE; // Defining database name

let dbConn = new sqlite3DBConn.Database(DB_NAME, (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    } else {
        console.log('Connected to the SQLIT3 database.');
    }    
});

module.exports = dbConn;