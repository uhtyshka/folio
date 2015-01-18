  
var express = require('express')
  , expJwt  = require('express-jwt')
  , jwt     = require('jsonwebtoken')
  , router  = express.Router()
  , path    = require('path')
  //, auth    = require('../tools/auth')
  , models  = require('../models/Model')
  , bParser = require('body-parser')
  , jsonPrs = bParser.json()
  , SECRET  = '09qrjjwef923jnrge$5ndjwk'
  , User    = require('../models/User.js')
  , uuid    = require('node-uuid');
  //, Models  =

var tokenManager = require('../tools/tokenManager');
router.use(bParser());

router.all('*', function(req, res, next) {
/*  console.log('------- R E Q U E S T ---- - - - - -  -  -  -  -   -   -    -     -       -');
  console.log(req.headers)*/
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  //res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});


router.use('/auth', function(req, res, next) {
  //console.log(tokenManager)
  console.log('::::: Should be check for session in redis')
  console.log(req.headers['authorization'])
  tokenManager.findSession({
    token : req.headers['authorization']
    //token : '547a2452761dbff97e6a15a5s'
  }, function (response) {
    if (!response) {
      res.status(401).end();
      return;
    }
    next();
  });
});


router.get('/', function(req, res) {
  res.render('jade/index', {title: 'ola comrade!'});
});

router.get('/login', function(req, res) {
  //res.render('jade/', {});
});

/*var newUser = new User({
  email: "krulatik@gmail.com"
});*/

router.post('/login', function(req, res) {
//
//@TODO: connect redis to project. Check tokenManager methods
//
  var clientPassword = req.body.password;
  function loginCallback(err, user){
    if( !!err ){ return next( err ); }
    if(user){
      user.checkEncrypted('password', clientPassword, function(err, correctPassword) {
        if( !correctPassword ){ 
          console.log('No authorization found, send 401.');
          res.send(404);
          return; 
        }
        var toToken = {
          userid  : user._id,
          userip  : req.connection.remoteAddress
        };
        tokenManager.createSession(toToken, function (resp) {
          var x = resp.token
          console.log(' - ROUTER: executed as callback for redis. Token is ', resp);
          res.json({token: resp.token}); 
        });

      });
    }
  };
  console.log('its ip to /login: ', req.connection.remoteAddress)
  console.log(tokenManager);
  User.findOne({ email: req.body.username }, loginCallback);
});

router.get('/auth/panel', function(req, res) {
  var authHead = req.headers['authorization'];
  if(!!authHead){
    jwt.verify((req.headers['authorization']).slice(7), SECRET, function(err, decoded) {
      console.log(decoded)
    });
    res.json({
      resp: 'you are authorized'
    });
  }
});


router.get('/auth/getsessions', function (req, res) {
  console.log('Im from get sessions! Whants going on here&');
  res.json({msg: 'hello from other side'});
});


router.post('/logout', function(req, res) {

});


router.get('/about', function(req, res) {

});

//TODO need to add models and and some interface to work with them

/*router.get('/:category', function(req, res) {
  var categoryName = req.params.category,
      category     = Category.check(categoryName);
  if(!!category){
    res.json(category);
  }
});*/

/*router.get('/:category/:project', function(req, res) {
  var categoryName = req.params.category,
      projectName  = req.params.project,
      category     = Category.check(categoryName);
      project      = Project.check(projectName, categoryName);
  if(!!category && !!project){
    res.json(category);
  }
});
*/
/*router.get('/:category/:project/:article', function(req, res) {
    var categoryName = req.params.category,
        projectName  = req.params.project,
        articleName  = req.params.article,
        category     = Category.check(categoryName);
        project      = Project.check(projectName, categoryName);
        article      = Project.check(projectName, [categoryName, projectName]);
    if(!!category && !!project && !!article){
      res.json(category);
    }
});
*/
module.exports = router;