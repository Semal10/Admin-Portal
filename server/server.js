const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDB = require("./config/db");
const Student = require("./models/Students");
const User = require('./models/Users');

const app = express();
app.use(cors());
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

app.post('/users/authenticate', (req,res) => {
  User.find({email:req.body.email, password:req.body.password}, (err,result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  })
})

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

// app.post("/users", (req, res) => {
//   const newUser = new User({ userId:req.body.id, email:req.body.email, password:req.body.password});
//   newUser
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
