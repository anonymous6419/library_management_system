const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // title: { type: String, required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "auther" },
  // isbn: { type: String, required: true , unique:true},
  // availableCopies: { type: Number, required: true },
  // issueDate:{type:Date},
  // returnDate:{type:Date},
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  status: { type: String, enum: ["available", "issued"], default: "available" },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user1",
    default: null,
  },
  issuedDate: { type: Date, default: null },
  returnBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null},
  dueDate: { type: Date, default: null },    
  penalty: { type: Number, default: null },
});

module.exports = mongoose.model("book", bookSchema);
