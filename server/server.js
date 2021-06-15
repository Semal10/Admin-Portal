const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static('build'));

require("./middlewares/passport")(passport);

// Connect Database
connectDB();

app.use("/api", router);
app.get('*',(req, res)=>{
    res.sendFile(path.resolve('build','index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
