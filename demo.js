var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'money'
});

connection.connect();

var record  = {id: 1, money: 23,datetime:new Date()};
var query = connection.query('INSERT INTO records SET ?', record, function(err, result) {
  if (err) throw err;
  console.log(result);
});

connection.query('SELECT * from records', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows);
});

connection.end();
