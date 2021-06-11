const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  age: Number,
  gender: String,
  courses: []
});

// Compile model from schema
module.exports =  mongoose.model('Student', StudentSchema );