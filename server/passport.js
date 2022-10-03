const LocalStrategy = require("passport-local").Strategy;
const model = require("./models/accountModel.js");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //check to see if the email provided matches email in database
      model
        .getPasswordByEmail(email)
        .then((pw_hash) => {
          if (!pw_hash) {
            return done(null, false, {
              message: "That email is not registered",
            });
          } else {
            bcrypt
              .compare(password, pw_hash)
              .then((res) => {
                if (res) {
                  //TODO: need to send the user or the account info
                  return done(null, pw_hash);
                } else {
                  return done(null, false, { message: "Password incorrect" });
                }
              })
              .catch((err) => done(err));
          }
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
