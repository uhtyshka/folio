var User = require('../models/User');

module.exports = {
  protect: function(req, res, next) {
    var token = req.headers['x-token'];
    User.findOne({accessToken: token}, function(err, user){
      if(err) { return next(err); }
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(401).send({
          error: 'authentication_required'
        });
      }
    });
  }
};