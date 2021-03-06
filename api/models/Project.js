var mongoose        = require('mongoose')
  , timestamps      = require('mongoose-times')
  , encrypted       = require('mongoose-encrypted')
  , uniqueValidator = require('mongoose-unique-validator');

encrypted.loadTypes(mongoose);

var Project = new mongoose.Schema({
  name: {
    type     : String,
    required : true,
    match    : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique   : true,
    index    : true,
  },
  description: {
    type  : String
  },
  updated: { 
    type    : Date, 
    default : Date.now 
  },
  projects: {
    type   : Array
  }
});


Project.methods.serialize = function() {
  return {
    id          : this.id,
    name        : this.name,
    description : this.description,
    updated     : this.updated,
    projects    : this.projects
  };
};

Project.plugin(timestamps);
Project.plugin(encrypted.plugins.encryptedPlugin);
Project.plugin(uniqueValidator);
module.exports = mongoose.model('Project', Project);