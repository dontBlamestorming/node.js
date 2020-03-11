// This file isn't uproaded and ignored by git

var MySQL = require('mysql');
var db = MySQL.createConnection({
    host : 'localhost',
    user : 'root',
    password : '111111',
    database : 'opentutorials'
  });
db.connect();

module.exports = db;