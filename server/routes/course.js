const express = require("express");
const Student = require("../models/Students");
const UserAuth = require('../helpers/UserAuth');

const router = express.Router();

router.post('/add', UserAuth,(req, res) => {
  if(req.user.role!=='admin') res.status(401).json({'type':'Unauthorized'});
  Student.findOneAndUpdate(
    { userId: req.body.userId },
    { courses: req.body.courses },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
