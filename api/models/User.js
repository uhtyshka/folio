var mongoose = require('mongoose');
var timestamps = require('mongoose-times');
var encrypted = require('mongoose-encrypted');
var uniqueValidator = require('mongoose-unique-validator');
encrypted.loadTypes(mongoose);

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique: true,
    index: true
  },
  password: {
    type: mongoose.Types.Encrypted,
    method: 'pbkdf2',
    minLength: 6,
    encryptOptions: {
      iterations: 20000,
      keyLength: 32,
      saltLength: 32
    },
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  accessToken: String,
  lastTouched: Date
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    lastTouched: this.lastTouched ? this.lastTouched.toJSON() : null
  };
};

userSchema.plugin(timestamps);
userSchema.plugin(encrypted.plugins.encryptedPlugin);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);