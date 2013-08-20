var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'money'
});

connection.connect();

exports.list = function(req, res) {
  connection.query('SELECT * from records', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
};

exports.create = function(req, res) {
  var record = req.body;
  connection.query('INSERT INTO records SET ?', record, function(err, result) {
    if (err) throw err;
    res.json({
      result: 'success'
    });
  });
};

exports.listBatch = function(req, res) {
  connection.query('SELECT * from batches', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
};

exports.batch = function(req, res) {
  var body = req.body;

  var batch = {
    money: body.total,
    datetime: new Date()
  };
  connection.query('INSERT INTO batches SET ?', batch, function(err, result) {
    if (err) throw err;
    var batchId = result.insertId;

    for (var i = body.records.length; i--;) {
      var data = JSON.parse(body.records[i]);
      data.batch = batchId;

      connection.query('INSERT INTO records SET ?', data, processError);
    }
  });
};

function processError(err, result) {
  if (err) throw err;
}
