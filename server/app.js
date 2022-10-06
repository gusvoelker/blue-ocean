require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const routers = require("./routes");
const compression = require("compression");
require("./passport.js")(passport);

const app = express();
// app.options("http://localhost:5173", cors());
app.use(compression());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser(process.env.SV_SECRET));
app.use(express.json());
app.use(
  session({
    secret: process.env.SV_SECRET,
    name: "test",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

for (let router of Object.values(routers)) {
  app.use(router);
}

module.exports = app;
