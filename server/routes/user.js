const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const config = require("config");
const SECRET = config.get("SECRET");

const router = express.Router();

router.post("/signup", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", async (req, res) => {
  let user = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  user = user[0];

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET,
    {
      expiresIn: "7 days",
    }
  );
  res
    .header("x-auth-header", token)
    .status(200)
    .json({
      id: user._id,
      email: user.email,
      password: user.password,
      role: user.role,
      token: `Bearer ${token}`,
      expiresIn: 168,
    });
});

module.exports = router;
