const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const teacher = require("./routes/teacher");
const student = require("./routes/student");
const InitiateMongoServer = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT");
  next();
});

app.use("/user", user);
app.use("/teacher", teacher);
app.use("/student", student);

InitiateMongoServer().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });
});
