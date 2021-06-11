const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Student = require("./models/Students");

const app = express();
app.use(bodyParser.json());

// Connect Database
connectDB();

app.get("/students", (req, res) => {
  Student.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/students/:id", (req, res) => {
  Student.find({userId:req.params.id}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// app.post("/", (req, res) => {
//   const newStudent = new Student({ id: req.body.id, name: req.body.name ,age:req.body.age, gender:req.body.gender, courses:req.body.courses});
//   newStudent
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
