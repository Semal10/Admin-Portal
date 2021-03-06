const express = require('express');
const Student = require('../models/Students');
const UserAuth = require('../helpers/UserAuth');

const router = express.Router();

router.get("/",UserAuth,(req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;
  console.log(page, limit);

  if(req.user.role!=='admin') return res.status(401).json({'type':'Unauthorized'});
  Student.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      Student.countDocuments({}, (err, count) => {
        res.json({ result, count });
      });
    }
  })
    .sort({
        userId: 'asc'
    })   
    .limit(limit)
    .skip(skipIndex)
    .exec();
});

router.get("/:id", UserAuth, (req, res) => {
  Student.find({ userId: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
