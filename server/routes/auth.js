const express = require("express");
const router = express.Router();
const model = require("../models/accountModel.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// GET REQUESTS //

router.post("/register", (req, res, next) => {
  const { email, password, firstName, lastName, isTeacher } = req.body;
  if (!email && password) {
    res.send({ message: "Please fill in email field" });
  } else if (!password && email) {
    res.send({ message: "Please fill in password field" });
  } else if (!email && !password) {
    res.send({ message: "Please fill in all fields" });
  } else {
    //check to see if the user exists
    model
      .getPasswordByEmail(email)
      .then((userPass) => {
        console.log("userpass", userPass);
        if (userPass.rows[0]) {
          res.status(400).send({ message: "Email already in use" });
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
                console.log(user.rows);
                //Not sure what should happen now
                //should we send them to the login page? with res.redirect
                res.send({ message: "Account successfully created" });
              })
              .catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/registerTeacher", (req, res, next) => {
  const { email, password1 } = req.body;
  if (!email && password) {
    res.json({ message: "Please fill in email field" });
  } else if (!password && email) {
    res.json({ message: "Please fill in password field" });
  } else if (!email && !password) {
    res.json({ messag: "Please fill in all fields" });
  } else {
    res.sendStatus(200);
  }
});

// LOGIN
//session is established after authentication
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    //is there like a homepage route?
    successRedirect: "/dashboard",
    failureRedirect: "/loginUser",
  });
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
// PUT / PATCH REQUESTS //

router.put("/example", (req, res, next) => {
  res.sendStatus(204);
});

router.patch("/example", (req, res, next) => {
  res.sendStatus(204);
});

// DELETE REQUESTS //

router.delete("/example", (req, res, next) => {
  res.sendStatus(204);
});

module.exports = router;
