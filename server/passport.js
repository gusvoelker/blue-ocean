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
          if (user.rows.length === 0) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          bcrypt
            .compare(password, user.rows[0].pw_hash)
            .then((res) => {
              if (res) {
                //TODO: need to send the user or the account info
                return done(null, {
                  id: user.rows[0].account_id,
                  isTeacher: user.rows[0].is_teacher,
                });
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
    console.log("called");
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log("called -deserialize");
    // model
    //   .getPublicAccountInfoById(id)
    //   .then((info) => {
    //     console.log("deserialized!");
    //     const user = info.rows[0];
    //     done(null, user);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    return done(null, user);
  });
};
