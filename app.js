var express    = require('express'),
    session    = require('express-session'),
    //mngs       = require('mongoose'),
    debug      = require('debug')('app:' + process.pid),
    path       = require('path'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    fs         = require('fs'),
    routes     = require('./api/routes/Route'),
    models     = require('./api/models/Model'),
    views      = require('./api/views/View'),
    port       = process.env.PORT || 8080;

debug("Starting application");
var app = express();
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(morgan('combined', {
  stream: accessLogStream
}));
//app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
//app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
/*var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();
app.use(session({
  genid: function(req) {
    return guid(); // use UUIDs for session IDs
  },
  secret: 'some string used for calculating hash'
}));*/
//console.log(__dirname)
app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'jade');
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'web')));
/*app.all('*', function(req, res, next) {
  console.log('any request');
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});*/
//console.log(routes)

//app.Route = routes.activate();
/*app.Model = models.activate();
app.View  = views.activate();*/

app.use(function (err, req, res, next) {
    var errorType = typeof err,
        code = 500,
        msg = { message: "Internal Server Error" };

    switch (err.name) {
        case "UnauthorizedError":
            code = err.status;
            msg = {message: 'invalid token'};
            console.log(err)
            break;
        case "BadRequestError":
        case "UnauthorizedAccessError":
        case "NotFoundError":
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }
    return res.status(code).json(msg);
});

app.listen(port);
//console.log(models.getCategories);
console.log('Magic happens on port ' + port);
