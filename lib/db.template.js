var MySQL = require('mysql');
var db = MySQL.createConnection({
    host : '',
    user : '',
    password : '',
    database : ''
  });
db.connect();