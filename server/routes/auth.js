const express = require("express");
const router = express.Router();
const model = require("../models/accountModel.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// POST REQUESTS //

router.post("/register", (req, res, next) => {
  const { email, password, firstName, lastName, isTeacher } = req.body;
  if (isTeacher && !email.endsWith(".edu")) {
    res.status(400).send("Teacher registration requires .edu email");
  } else if (!email && password) {
    res.status(400).send("Please fill in email field");
  } else if (!password && email) {
    res.status(400).send("Please fill in password field");
  } else if (!email || !password || !firstName || !lastName || isTeacher === undefined) {
    res.status(400).send("Please fill in all required fields");
  } else {
    model
      .getPasswordByEmail(email)
      .then((userPass) => {
        if (userPass.rows[0]) {
          res.status(400).send("Email already in use");
        } else {
          bcrypt.hash(password, 12, function (err, hash) {
            if (err) {
              console.log(err);
            }
            model
              .createAccount({
                email,
                passwordHash: hash,
                firstName,
                lastName,
                isTeacher,
              })
              .then((user) => {
                res
                  .status(201)
                  .send("Account successfully created");
              })
              .catch((err) => res.sendStatus(500));
          });
        }
      })
      .catch((err) => res.sendStatus(500));
  }
});

// LOGIN
//session is established after authentication
router.post("/login", (req, res, next) => {
  console.log(req.body.email, req.body.password);
  passport.authenticate(
    "local",
    (err, user, errorInfo) => {
      if (err) return res.sendStatus(500);
      if (!user) return res.status(400).send(errorInfo.message);
      req.logIn(user, function (err) {
        if (err) return next(err);
        console.log(req.session);
        return res.status(200).send("You have been successfully logged in");
      });
    }
  )(req, res, next);
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("You are logged out!");
  });
});

// Authenticate all user requests
// Users should not be able to access any resources without being signed in
router.use('/', (req, res, next) => {
  if (!req.user) {
    res.status(403).send('Login required');
  } else {
    next();
  }
});

module.exports = router;
