import { Router } from 'express'
import * as cars from './cars.json'
var dbConn = require("./database");

const router = Router();

export class DBResult {
  error: string = "";
  rows: any;
  success: boolean = false;
};

function getDBRow(sql: string, params: any[]) {
  return new Promise<DBResult>((resolve, reject) => {
    var dbResult = new DBResult();
    dbConn.all(sql, params, (error: any, rows: []) => {
      if (error) {
        dbResult.error = error.message;
        dbResult.success = true;
        dbResult.rows = [];
        reject(dbResult);
      } else {
        dbResult.error = "";
        dbResult.success = false;
        dbResult.rows = rows;
        resolve(dbResult);
      }
    });      
  });
}

function executeSQLQuery(sql: string, params: any[]) {
  return new Promise<DBResult>((resolve, reject) => {
    var dbResult = new DBResult();
    // Serializing commands to guarantee that we just COMMIT data if everything is OK with the execution
    dbConn.serialize(() => {
      dbConn.run('BEGIN TRANSACTION;');
      dbConn.run(sql + ';', params, (error: any, rows: []) => {
        if (error) {
          dbResult.error = error.message;
          dbResult.rows = [];
          dbResult.success = false;
          dbConn.run('ROLLBACK;');
          reject(dbResult);
        } else {
          dbResult.error = "";
          dbResult.rows = [];
          dbResult.success = true;
          dbConn.run('COMMIT;');
          resolve(dbResult);
        }
      });       
    });     
  });
}

// Main route
router.get('/', (req, res) => {
  res.json({ "success": true, "data": [], "error": ""});
})

// Cars list
router.get('/cars', (req, res) => {
  var sqlQuery = 'select c.*, m.name as maker from cars c join makers m on m.id = c.maker_id order by c.id';
  var params: any[] = [];
  getDBRow(sqlQuery, params)
    .then(dbResult => {
      res.json({ "success": true, "data": dbResult.rows, "error": "" });
    })
    .catch(dbResult => {
      res.json({ "success": true, "data": dbResult.rows, "error": dbResult.error });
    });
})

// Get single car
router.get('/car/:id', (req, res, next) => {
  var sqlQuery = 'select c.*, m.name as maker from cars c join makers m on m.id = c.maker_id where c.id = ? order by c.id';
  var params = [req.params.id];
  getDBRow(sqlQuery, params)
    .then(dbResult => {
      // "Success" is only true when we find a record
      res.json({ "success": dbResult.success, "data": dbResult.rows, "error": !dbResult.success ? "Car not found" : "" });
    })
    .catch(dbResult => {
      res.json({ "success": dbResult.success, "data": dbResult.rows, "error": dbResult.error });
    });
})

// Star/Unstar single car
router.post('/car/:id/star/:starred', (req, res, next) => {
  var sqlQuery = 'update cars set starred = ? where cars.id = ?';
  var params = [req.params.starred, req.params.id];
  executeSQLQuery(sqlQuery, params)
    .then(dbResult => {
      // "Success" is only true when we find a record
      res.json({ "success": dbResult.success, "data": [], "error": false });
    })
    .catch(dbResult => {
      res.json({ "success": dbResult.success, "data": [], "error": dbResult.error });
    });
})

export default router
