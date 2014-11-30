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

//console.log('its token manager');

/*function allSessions (options) {
  var opt = {
        app : options.app || 'folio',
        dt  : options.dt  || 3600   ,
      },
      callback = _.isFunction(options.callback)
                   ? options.callback
                   : function(err, resp){ return console.log('callback from allSession(): ', resp); };

  return rs.soapp(opt, callback);
}
*/
rs.create({
    app : 'folio'
  , id  : 'someId'
  , ip  : '127.0.0.1'
  , ttl : 3600
  }, function(err, resp) {
    console.log(resp);
  });
rs.soapp({
  app : 'folio'
, dt : 3600
}, function(err, resp) {
  console.log('its from soap')
  console.log('before kill all')
  console.log(resp)

  console.log(' \n ======================= \n ')
  rs.killall({ app : 'folio' }, function(err, resp) {
    console.log('inside killall')
    console.log(resp);
  });
});

var x = allSessions({
  callback : function (err, resp) {
    return resp;
  }
});

module.exports = {
  createUserSession: function (userid, callback) {
    var response = {
      code  : 200,
      token : null,
      error : null
    };
    if (userId == undefined) {
      response.code  = 403;
      response.token = null;
      response.error = 'userId is undefined. Please, check'
      return callback(response);
    }
    rs.create({
      app : rsname,
      id  : userid,
      ip  : '127.0.0.1',
      ttl : 3600
    }, function (err, resp) {
      if(err){
        response.code  = 403;
        response.token = null;
        response.error = err;
        return callback(response);
      }
      response.code  = 200;
      response.token = JSON.stringify(resp);
      response.error = null;
      return callback(response);
    });
  }, // end createUserSession
  killSession : function (req, callback) {
    
  }
};

console.log('its x: ', x);
