const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationality: { type: String },
  dob: { type: Date },
});

module.exports = mongoose.model("author", AuthorSchema);
