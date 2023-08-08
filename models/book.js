const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // title: { type: String, required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "auther" },
  // isbn: { type: String, required: true , unique:true},
  // availableCopies: { type: Number, required: true },
  // issueDate:{type:Date},
  // returnDate:{type:Date},
    title:{type:String , required:true},
    author:{type:String, required:true},
    isbn: { type: String, required: true , unique:true},
    availableCopies: { type: Number, required: true },
    status : {type: String, enum:['availabe','issued'],default:'available'},
    issuedTo:{type:mongoose.Schema.Types.ObjectId, ref:'user', default:null}
});

module.exports = mongoose.model("book", bookSchema);
