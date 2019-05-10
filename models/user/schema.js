const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    login: { type: String, required: true },
    hash: { type: String },
    salt: { type: String },
    email: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
    group: { type: String },
    faculty: { type: String },
    role: { type: String },
    authorities: {
      root: { type: Boolean },
      admin: { type: Boolean },
      manager: { type: Array, default: undefined }
    },
});  

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };
  
  userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      login: this.login,
      authorities: this.authorities,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'evalint-92873rhr3v23rv');
  }
  
  userSchema.methods.toAuthJSON = function() {
    return {
      user: {
        _id: this._id,
        login: this.login,
        name: this.name,
        email: this.email,
        authorities: this.authorities,
        photo: this.photo,
        faculty: this.faculty,
        group: this.group,
        role: this.role,
      },
      token: this.generateJWT(),
    };
  };

module.exports = userSchema;

