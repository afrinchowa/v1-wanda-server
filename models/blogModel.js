const { ObjectId } = require("mongodb");

const Blog = {
  title: String,
  content: String,
  location: String,
  dateOfTravel: String,
  category: String,
  details: String,
  photoURL: String,
};

module.exports = { Blog };
