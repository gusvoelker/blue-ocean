module.exports = {
  auth: require("./auth.js"), // This must come first
  accounts: require("./accounts.js"),
  languages: require("./languages.js"),
  chats: require("./chats.js"),
  friends: require("./friends.js"),
  classes: require("./classes.js"),
  ratings: require("./ratings.js"),
  meetings: require("./meetings.js")
};
