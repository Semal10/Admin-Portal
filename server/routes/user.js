const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const config = require("config");
const SECRET = config.get("SECRET");
const UserAuth = require("../helpers/UserAuth");

const router = express.Router();

router.get("/whoami", UserAuth, (req, res) => {
  res.json(req.user);
});

router.post("/signup", async (req, res) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  newUser.password = await bcrypt.hash(newUser.password, salt);
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
    });
    user = user[0];
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
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
    }
    else{
      res.status(401).json({
        type:'Invalid Password'
      })
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/logout", UserAuth, (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.json({ type: "Logout Successful" });
});

module.exports = router;
