const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: Number,
  email: String,
  password: String
});

// Compile model from schema
module.exports =  mongoose.model('User', UserSchema );