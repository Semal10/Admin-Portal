const express = require("express");
const Student = require("../models/Students");

const router = express.Router();

router.post('/add', (req, res) => {
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
