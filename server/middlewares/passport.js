const User = require("../models/Users");
const config = require("config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const SECRET = config.get("SECRET");

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opt, async (payload, done) => {
      await User.findById(payload.userId)
        .then((user) => {
          if (user) return done(null, user);
          else return done(null, false);
        })
        .catch((err) => {
          return done(null,false);
        });
    })
  );
};
