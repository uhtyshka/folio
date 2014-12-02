


//
//@TODO: need to add methods for db
//       and handle the router interaction.
//       You can check:
//         https://www.npmjs.org/package/redis-sessions
//         https://github.com/paulthomas404/trash-map/blob/8be8463e6a7ec20c3c7d077aa0884e547d05984b/api/services/AuthController.js
//


var RedisSessions = require("redis-sessions"),
    _             = require('underscore');
//
// Parameters for RedisSession:
//
// e.g. rs = new RedisSession({host:"192.168.0.20"});
//
// `port`: *optional* Default: 6379. The Redis port.
// `host`, *optional* Default: "127.0.0.1". The Redis host.
// `options`, *optional* Default: {}. Additional options. See: https://github.com/mranney/node_redis#rediscreateclientport-host-options
// `namespace`: *optional* Default: "rs". The namespace prefix for all Redis keys used by this module.
// `wipe`: *optional* Default: 600. The interval in second after which the timed out sessions are wiped. No value less than 10 allowed.
// `client`: *optional* An external RedisClient object which will be used for the connection.
//
rs = new RedisSessions({
  host : 'localhost',
  port : 6379,
  namespace : 'folio'
});

rsname = "folio";

rs.create({
    app : 'folio'
  , id  : 'someId'
  , ip  : '127.0.0.1'
  , ttl : 3600
  }, function(err, resp) {
    console.log(resp);
  }
);

rs.soapp({
  app : 'folio'
, dt : 3600
}, function(err, resp) {
  console.log('its from soap')
  console.log('before kill all')
  console.log(resp)

  console.log(' \n ======================= \n ')
  rs.killall({ app : 'folio' }, function(err, resp) {
    console.log('inside killall');
    console.log(resp);
  });
});

/*var x = allSessions({
  callback : function (err, resp) {
    return resp;
  }
});*/

module.exports = {
  createSession: function (options, callback) {
    var opt      = {
      userid : options.userid,
      userip : options.userip
    };
    var response = {
      code  : 200,
      token : null,
      error : null
    };
    if (opt.userid == undefined || opt.userip == undefined) {
      response.code  = 403;
      response.token = null;
      response.error = 'userId is undefined. Please, check'
      return callback(response);
    }
    rs.create({
      app    : rsname,
      id     : opt.userid,
      ip     : opt.userip,
      msg    : 'hello from token',
      ttl    : 120
    }, function (err, resp) {
      if(err){
        console.log(' - REDIS: fail for user id: ' + opt.userid + ' with ip: ' + opt.userip);
        response.code  = 403;
        response.token = null;
        response.error = err;
        return callback(response);
      }
      console.log(' - REDIS: success for user id: ' + opt.userid + ' with ip: ' + opt.userip);
      response.code  = 200;
      response.token = JSON.stringify(resp);
      response.error = null;
      return callback(response);
    });
  }, // end createUserSession

  findSession : function (options, callback) {
    var opt = {
      token : options.token
    };
    rs.get({
      app   : rsname,
      token : opt.token
    }, function (err, resp) {
//@TODO: add error handler      
      console.log(resp);
      return callback(resp);
    })
  }, //end findSession

  killSession : function (req, callback) {

  }
};

//console.log('its x: ', x);
