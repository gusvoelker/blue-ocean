require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const routers = require("./routes");
const compression = require("compression");
require("./passport.js")(passport);

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors({ origin: process.env.CL_ORIGIN }));
app.use(
  session({
    secret: process.env.SV_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

for (let router of Object.values(routers)) {
  app.use(router);
}

module.exports = app;
