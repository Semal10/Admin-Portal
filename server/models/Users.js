const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: 'User'
  },
});

// Compile model from schema
module.exports =  mongoose.model('User', UserSchema );