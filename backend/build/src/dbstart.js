"use strict";
// Database preparation module
// Info: This scripts aims just to provide a complete database for our tests and validations
// It simply takes an SQL script file, iterates on it and execute each SQL script line, after this we have a full and ready database for testing purposes
require("dotenv/config");
var fs = require('fs');
var path = require('path');
var sqlite3Instance = require('sqlite3').verbose();
var DBNAME = process.env.SOURCE_DATABASE; // Defining database name
var dbInstance = new sqlite3Instance.Database(DBNAME, function (error) {
    if (error) {
        console.error(error.message);
        throw error;
    }
    else {
        console.log('Connected to the SQLIT3 database.');
        var sqlScriptArray = [];
        var sqlScriptStream = fs.createReadStream(path.join(__dirname, '../db_scripts') + '/prepare_db.sql', 'utf8');
        var data = '';
        sqlScriptStream.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            var dataArray = data.split(';');
            for (var index = 0; index < dataArray.length; index++) {
                var script = dataArray[index];
                sqlScriptArray.push(script);
            }
            if (dbInstance) {
                dbInstance.serialize(function () {
                    dbInstance.run('PRAGMA foreign_keys=OFF;');
                    dbInstance.run('BEGIN TRANSACTION;');
                    // Looping into sql script array to execute each one of them
                    for (var index = 0; index < sqlScriptArray.length; index++) {
                        var scriptToExecute = sqlScriptArray[index];
                        if (scriptToExecute.trim().length > 0) {
                            dbInstance.run(scriptToExecute, function (error) {
                                if (error) {
                                    throw error;
                                }
                            });
                        }
                    }
                    dbInstance.run('COMMIT;'); // Commiting transaction
                    dbInstance.close(function (error) {
                        if (error) {
                            console.log(error.message);
                        }
                        else {
                            console.log('Database connection closed successfuly.');
                        }
                    });
                });
            }
        });
    }
});
