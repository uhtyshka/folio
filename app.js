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
app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'jade');
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'web')));
/*

@TODO: create separate module for error handler

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
});*/

app.listen(port);
//console.log(models.getCategories);
console.log('Magic happens on port ' + port);
