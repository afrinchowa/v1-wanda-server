const { ObjectId } = require("mongodb");

const User = {
  email: String,
  name: String,
  lastSignInTime: Date,
};

module.exports = { User };
