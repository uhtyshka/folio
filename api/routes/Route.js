  
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


router.use('/auth', expJwt({secret: SECRET}), function(req, res) {
  //console.log(tokenManager)
  console.log('its x')
  console.log(req.header['authorization'])
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
        var sessionId = uuid();       
        console.log('========================================')
        console.log('Auth was success');
        console.log('random sessionId:' + sessionId);
        console.log('========================================')
        var toToken = {
          u : user._id,
          s : sessionId
        };
        var token = jwt.sign(JSON.stringify(toToken), SECRET, {
          expireTimeInMinutes: 30
        });
         var currentdate = new Date(); 
         var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        console.log('Token:');
        console.log(token);
        console.log('========================================')
        console.log('Lets decode token before sendind');
        jwt.verify(token, SECRET, function(err, decoded) {
          console.log(decoded)
        });
        console.log('========================================')
         res.json({token: token});

      });
    }
  };

  User.findOne({ email: req.body.username }, loginCallback);
});

router.get('/auth/panel', function(req, res) {
  console.log('wellcome! Hope you are authorized');
  //console.log(jwt.decode(req.headers['authorization']));
  jwt.verify((req.headers['authorization']).slice(7), SECRET, function(err, decoded) {
    console.log(decoded)
  });
  res.json({
    resp: 'you are authorized'
  });
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