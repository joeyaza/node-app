var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  firstname: { type: String},
  surname: { type: String},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
  });

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password){
  return bcyrpt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);