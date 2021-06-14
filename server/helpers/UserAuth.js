const jwt = require('jsonwebtoken');
const config = require('config');
const SECRET = config.get('SECRET');
const passport = require('passport');

const userAuth = passport.authenticate('jwt',{session:false});

module.exports = userAuth;