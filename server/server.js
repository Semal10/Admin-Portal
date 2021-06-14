const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");
const router = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// Connect Database
connectDB();

app.use("/", router);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
