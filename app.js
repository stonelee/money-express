/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  record = require('./routes/record'),
  http = require('http'),
  path = require('path');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/records', record.list);
//app.post('/records', record.create);

app.post('/batch', record.batch);
app.get('/batches', record.listBatch);
app.get('/batches/:batch', record.listRecord);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
