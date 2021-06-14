const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const config = require("config");
const SECRET = config.get("SECRET");
const UserAuth = require('../helpers/UserAuth');

const router = express.Router();

router.get("/whoami", UserAuth, (req, res) => {
  res.json(req.user);
});

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
  try {
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

    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.send(err);
  }
});

router.post('/logout',UserAuth,(req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.json({'type':'Logout Successful'});
});

module.exports = router;
