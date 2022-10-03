const LocalStrategy = require("passport-local").Strategy;
const model = require("./models/accountModel.js");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //check to see if the email provided matches email in database
      model
        .getAccountAuthByEmail(email)
        .then((user) => {
          console.log(user.rows);
          if (user.rows[0].length === 0) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          bcrypt
            .compare(password, user.rows[0].pw_hash)
            .then((res) => {
              if (res) {
                //TODO: need to send the user or the account info
                return done(null, { id: user.rows[0].account_id });
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            })
            .catch((err) => done(err));
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
