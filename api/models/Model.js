var app        = require('express')()
  , mngs       = require('mongoose')
  , User       = require('./User')
  , Category   = require('./Category');

var uuid = require('node-uuid');
mngs.connect('mongodb://localhost/test');

var db = mngs.connection,
    mdl = this;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('db opened. Now time for entities')
  //console.log(mdl);
  mdl.createEntities();
});

// Creating user for Katya

mdl.createEntities = function () {
  var newUser = new User({
    firstName: '!!!!!!!!!!!!!!!!!!!!!!!!!!katya',
    lastName: 'bochkar',
    email: "krulatik@gmail.com",
    password: '123123'
  });
  newUser.accesToken = uuid();
  newUser.save(function(e) {
    // callback
  });

  // Creating Art & Design categories

  var art = new Category({
    name        : 'Art',
    description : 'Art Description',
    projects    : []
  });
  art.accesToken = uuid();
  art.save(function() {
    //callback
  });


  var design = new Category({
    name        : 'Design',
    description : 'Design Description',
    projects    : []
  });
  design.accesToken = uuid();
  design.save(function() {
    //console.log(db.categories);
  });
  //console.log(db);

  module.exports.getCategories = function(){
    return db.collections.categories;
  };
};

// // // // // // // // // // // // // // // // // // // // 